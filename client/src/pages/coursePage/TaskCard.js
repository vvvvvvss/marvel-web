import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CardHeader,
  Typography,
  Card,
  CardContent,
  Link,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  CardActions,
} from "@mui/material";
import { useState, useEffect, memo } from "react";
import { editCourse } from "../../API";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import useAuth from "../../utils/hooks/useAuth.js";
import RenderMarkdown from "../../components/RenderMarkdown.js";
import Editor from "../../components/Editor.js";

// this handles deleting task and editing task
const TaskCard = ({ tsk, tskIndex, lvIndex }) => {
  const { authUser } = useAuth();
  const [mode, setMode] = useState("view");
  const [editorTab, setEditorTab] = useState("write");
  const [content, setContent] = useState(tsk?.description);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams();

  useEffect(() => {
    setMode("view");
    setContent(tsk?.description);
    setChanged(false);
  }, [tsk?._id, authUser?.id]);

  const { mutate: handleModify, isLoading } = useMutation(
    (operation) =>
      editCourse(id, operation, tskIndex, lvIndex, tsk?._id, null, content),
    {
      onSuccess: (response) => {
        if (response?.status === "500") {
          alert(
            "Looks like somebody else is also editing this course right now. Because you both have different versions of data that didn't match, we rejected your request to prevent problems. we have updated your page with latest data."
          );
        } else if (["201", "500"].includes(response?.status)) {
          queryClient.setQueryData([{ courseCode: id, scope: "levels" }], {
            ...response,
            status: "200",
          });
        } else {
          alert("Something went wrong.");
        }
        setChanged(false);
        setMode("view");
        setConfirmOpen(false);
      },
      onError: () => {
        alert("Something went wrong.");
      },
    }
  );

  return (
    <>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Task? This CANNOT be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Disagree
          </Button>
          <Button
            onClick={() => handleModify("deleteTask")}
            variant="contained"
            color="error"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* TASK CARD  */}
      <Card
        sx={{
          marginTop: "15px",
          minWidth: { xs: "290px", sm: "475px" },
          opacity: isLoading ? "0.4" : "1",
          pointerEvents: isLoading ? "none" : "auto",
        }}
        key={tskIndex}
      >
        <CardHeader
          action={
            authUser?.currentRole === "INS" &&
            authUser?.currentInsCourse.includes(id) && (
              <span>
                <IconButton
                  size="small"
                  sx={{ marginRight: "15px", color: "secondary.light" }}
                  onClick={() => {
                    setConfirmOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "secondary.light" }}
                  disabled={changed}
                  size="small"
                  onClick={() => setMode(mode === "view" ? "edit" : "view")}
                >
                  <EditIcon />
                </IconButton>
              </span>
            )
          }
          title={
            <Typography variant="subtitle1">Task {tskIndex + 1}</Typography>
          }
        />
        <CardContent>
          {mode === "view" ? (
            <RenderMarkdown content={tsk?.description} />
          ) : (
            <>
              {/* // editor */}
              <Editor
                value={content}
                onChange={(e) => {
                  setContent(e);
                  setChanged(true);
                }}
                selectedTab={editorTab}
                onTabChange={() =>
                  setEditorTab(editorTab === "write" ? "preview" : "write")
                }
              />
            </>
          )}
        </CardContent>
        {changed && (
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setContent(tsk?.description);
                setChanged(false);
                setMode("view");
              }}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleModify("editTask")}
            >
              save
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default memo(TaskCard);
