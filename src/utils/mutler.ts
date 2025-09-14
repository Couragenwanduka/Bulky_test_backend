import multer from 'multer';
import { Request } from 'express';

// Memory storage for direct buffer access
const storage = multer.memoryStorage();

// File filter (still useful for validating types)
const fileFilter = (req: Request, file: any, cb: any) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf', // <-- add this to allow PDFs
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed!'), false);
  }
};

// File size limit (optional)
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB
};

export const upload = multer({
  storage,
  fileFilter,
  limits,
});
