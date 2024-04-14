"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Paper } from "@marvel/ui/ui";
import { TextField, Button } from "@marvel/ui/ui/client";

const confirmationText = "delete sim sim";

const WorkDeleter = ({ course }) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async () =>
      (await axios.delete(`/api/course/delete?id=${course?.id}`)).data,
    onError: (e: AxiosError) =>
      alert(e.response?.data?.["message"] || "Couldn't delete."),
    onSuccess: () => {
      alert("Course deleted successfully.");
      router.back();
    },
  });

  return (
    <Paper
      border
      className={
        "p-5 w-full border-[red] flex gap-5 flex-col bg-p-10 dark:bg-p-0 mt-5 rounded-lg"
      }
    >
      <h3 className="text-2xl">Delete Course</h3>
      <p>
        !!!IMPORTANT!!! Deleting this course will also delete ALL COURSE WORKS,
        and ALL RESOURCE ARTICLES. It&apos;ll be a CATASTROPHE if you don&apos;t
        know what you&apos;re doing. Are you sure? type&nbsp;
        <span className="font-bold text-s-4 dark:text-s-5">
          {confirmationText}
        </span>{" "}
        to confirm.
      </p>
      <TextField
        fullWidth
        placeholder="Type here..."
        value={input}
        onChange={(e) => setInput(e)}
      />
      <Button
        variant="outlined"
        isDisabled={input !== confirmationText || isPending}
        onPress={() => mutate()}
      >
        Delete this Course
      </Button>
    </Paper>
  );
};

export default memo(WorkDeleter);
