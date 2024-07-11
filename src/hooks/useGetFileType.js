function useGetFileType() {
  const getFileType = (file) => {
    if (!file) return "unknown";

    const fileExtension = file.split(".").pop().toLowerCase();

    // Check for common image file extensions
    if (["jpeg", "jpg", "png", "gif", "bmp", "svg"].includes(fileExtension)) {
      return "image";
    }

    // Check for common video file extensions
    if (["mp4", "avi", "mov", "mkv", "webm"].includes(fileExtension)) {
      return "video";
    }

    // Check for common audio file extensions
    if (["mp3", "wav", "ogg", "m4a"].includes(fileExtension)) {
      return "audio";
    }

    // Default to 'raw' for other file types
    return "raw";
  };

  return { getFileType };
}

export default useGetFileType;
