import toast from "react-hot-toast";

export const showToast = (
  type: "SUCCESS" | "ERROR" | "WARNING",
  message: string,
  position:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right" = "top-right"
) => {
  if (type === "SUCCESS")
    return toast.success(message, {
      position: position || "top-right",
    });
  else if (type === "ERROR") {
    return toast.error(message, {
      position: position || "top-right",
    });
  } else if (type === "WARNING") {
    return toast.error(message, {
      position: position || "top-right",
    });
  }
};
