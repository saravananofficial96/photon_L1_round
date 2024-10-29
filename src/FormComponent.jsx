import React, { useEffect } from "react";
import { Modal } from "@mui/material";
export const FormComponent = (props) => {
  const {
    handleChange = () => "",
    handleSubmit = () => "",
    isEditing = false,
    formData = {},
    isOpen = false,
  } = props || {};

  useEffect(() => {

  }, [isOpen]);
  return (
    <Modal open={isOpen}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          placeholder="id"
          value={formData.id}
          onChange={(event) => {
            handleChange(event, "id");
          }}
          disabled={isEditing ? true : false}
        />
        <input
          placeholder="userId"
          value={formData.userId}
          onChange={(event) => {
            handleChange(event, "userId");
          }}
          disabled={isEditing ? true : false}
        />
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(event) => {
            handleChange(event, "title");
          }}
        />
        <input
          name="body"
          placeholder="body"
          value={formData.body}
          onChange={(event) => {
            handleChange(event, "body");
          }}
        />

        <button onClick={handleSubmit}>{isEditing ? "Update" : "Add"}</button>
      </div>
    </Modal>
  );
};
export default FormComponent;
