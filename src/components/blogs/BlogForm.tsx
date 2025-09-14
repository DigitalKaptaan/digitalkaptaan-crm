"use client";
import React, { useState } from "react";
import styles from "@/styles/components/blogForm.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "@/shared";

type BlogFormProps = {
  type: "CREATE" | "EDIT";
  initialData?: {
    title: string;
    content: string;
    status: string;
    coverImage: string;
    meta: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
  onSubmit: (values: {
    title: string;
    content: string;
    status: string;
    coverImage: string;
    meta: {
      title: string;
      description: string;
      keywords: string[];
    };
  }) => void;
};

const BlogForm: React.FC<BlogFormProps> = ({ type, initialData, onSubmit }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      content: "",
      status: "draft",
      coverImage: "",
      meta: {
        title: "",
        description: "",
        keywords: [],
      },
    }
  );

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("meta.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        meta: { ...prev.meta, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        keywords: e.target.value.split(",").map((k) => k.trim()),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>
        {initialData ? "Edit Blog" : "Create Blog"}
      </h2>

      {/* Title */}
      <div className={styles.field}>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          label={"Title"}
        />
      </div>

      {/* Content */}
      <div className={styles.field}>
        <label className={styles.label}>Content</label>

        <Editor
          apiKey="bpnq0dg1egfmz8k0xutahmae13p0qrasug1hrsw1i23qshcs"
          value={formData.content}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      {/* Status */}
      {type === "EDIT" && (
        <div className={styles.field}>
          <label className={styles.label}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      )}

      {/* Cover Image */}
      {type === "EDIT" ? (
        <div className={styles.field}>
          <Input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            label={"Cover Image URL"}
          />
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Cover Preview"
              className={styles.imagePreview}
            />
          )}
        </div>
      ) : (
        <div className={styles.field}>
          <Input
            type="file"
            accept="image/*"
            name="coverImage"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const previewUrl = URL.createObjectURL(file);

                // store preview for UI + file for uploading
                setFormData((prev) => ({
                  ...prev,
                  coverImage: previewUrl, // temporary preview
                  coverFile: file, // keep original file for backend upload
                }));
              }
            }}
            label={"Cover Image URL"}
          />
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Cover Preview"
              className={styles.imagePreview}
            />
          )}
        </div>
      )}
      {/* Meta Info */}
      <div className={styles.metaSection}>
        <h3 className={styles.metaTitle}>Meta Information</h3>

        <div className={styles.field}>
          <Input
            type="text"
            name="meta.title"
            value={formData.meta.title}
            onChange={handleChange}
            label={"Meta Title"}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Meta Description</label>
          <textarea
            name="meta.description"
            value={formData.meta.description}
            onChange={handleChange}
            rows={3}
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <Input
            type="text"
            name="meta.keywords"
            value={formData.meta.keywords.join(", ")}
            onChange={handleKeywordsChange}
            label={"Meta Keywords (comma-separated)"}
          />
        </div>
      </div>

      <button type="submit" className={styles.button}>
        {initialData ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
