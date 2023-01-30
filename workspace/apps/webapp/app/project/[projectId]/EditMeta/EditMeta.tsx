'use client';
import { FullScreenDialog, IconButton, Paper, TextField } from '@marvel/web-ui';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { VscSettings as ManageIcon } from 'react-icons/vsc';
import { VscClose as CloseIcon } from 'react-icons/vsc';
import ReactImageUploading, { ImageListType } from 'react-images-uploading';
import ImageCompressor from 'browser-image-compression';
import ManagePeople from './ManagePeople';

const EditMeta = ({ projectWork }) => {
  const sessionUser = useSession()?.data?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [copy, setCopy] = useState({
    name: projectWork?.name,
    note: projectWork?.note,
    coverPhoto: projectWork?.coverPhoto,
  });

  const handleImageUpload = async (imageList) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    const compressedImage = await ImageCompressor(imageList[0]?.file, options);
    const reader = new FileReader();
    reader.readAsDataURL(compressedImage);
    reader.onloadend = () => {
      setCopy({ ...copy, coverPhoto: reader?.result });
    };
  };

  if (
    sessionUser?.id &&
    (projectWork?.authors
      ?.map((a) => a?.googleId)
      .includes(sessionUser?.googleId) ||
      projectWork?.coordinators
        ?.map((c) => c?.googleId)
        .includes(sessionUser?.googleId))
  ) {
    return (
      <>
        <IconButton
          onClick={() => setModalOpen((p) => !p)}
          variant="outlined"
          className="absolute top-3 right-2 text-sm"
        >
          <ManageIcon className="h-5 w-5" />
        </IconButton>
        {modalOpen && (
          <FullScreenDialog
            className="pb-36"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <div className="w-full max-w-2xl py-24 gap-5">
              <IconButton
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                <CloseIcon className="h-10 w-20" />
              </IconButton>
              {projectWork?.authors
                ?.map((a) => a?.googleId)
                .includes(sessionUser?.googleId) && (
                <form
                  className="my-5 flex flex-col pb-36"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label htmlFor="name" className="text-3xl py-3">
                    Project Name
                  </label>
                  <TextField
                    id="name"
                    value={copy?.name}
                    onChange={(e) =>
                      setCopy({ ...copy, name: e.target?.value })
                    }
                    placeholder="Project name"
                    maxLength={60}
                  />
                  <label htmlFor="caption" className="text-3xl py-3">
                    Caption
                  </label>
                  <TextField
                    id="caption"
                    value={copy?.note}
                    onChange={(e) =>
                      setCopy({ ...copy, note: e.target?.value })
                    }
                    placeholder="A Short Caption for the project..."
                    maxLength={250}
                  />
                  <ReactImageUploading
                    value={copy?.coverPhoto as ImageListType}
                    onChange={handleImageUpload}
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload, dragProps }) => (
                      <div className="w-full flex gap-5 my-5">
                        <Paper
                          border
                          className="flex-auto bg-p-2 p-5 flex h-48 rounded-lg justify-center items-center"
                          onClick={() => {
                            setCopy((p) => ({ ...p, coverPhoto: '' }));
                            onImageUpload();
                          }}
                          {...dragProps}
                        >
                          <h6>Cover Photo (optional). Click or Drop here.</h6>
                        </Paper>
                        {copy?.coverPhoto && (
                          <div className="w-1/2">
                            <img
                              className="flex-1 rounded-lg object-cover h-48"
                              src={copy?.coverPhoto as string}
                              alt="cover photo"
                              height="150"
                              width="100%"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </ReactImageUploading>
                  {projectWork?.coordinators
                    ?.map((c) => c?.googleId)
                    .includes(sessionUser?.googleId) && (
                    <ManagePeople projectWork={projectWork} />
                  )}
                </form>
              )}
            </div>
          </FullScreenDialog>
        )}
      </>
    );
  } else {
    return <div></div>;
  }
};
export default EditMeta;
