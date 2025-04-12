'use client';

import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function RichTextEditorComponent(props: { value: any, setValue: any, onBlur?: any }) {
  const { value, setValue, onBlur } = props;
  return <ReactQuill className='text-gray-600' value={value} onChange={setValue} onBlur={onBlur} />;
}