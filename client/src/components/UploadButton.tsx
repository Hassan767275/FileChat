import uploadButton from "../assets/uploadbutton.png";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Chatbox from "./Chatbox";
import type { Message } from "../types";
import { uploadData } from "../api";

export default function UploadButton() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])
  const [showChatbox, setShowChatbox] = useState(false)

  return (
    <div>
      <div className="mt-4 flex flex-col items-center">
        <label className="py-2 px-8 bg-[#6651F5] hover:bg-[#5540E8] flex rounded-2xl gap-2">
          <img className="w-10" src={uploadButton} />
          <p className="text-white font-bold text-xl">Upload PDF</p>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              setIsUploading(true)
              setShowChatbox(false)
              setMessages([])

              if (file) {
                const formData = new FormData();
                formData.append("file", file);
                setFile(file);

                setIsUploading(true);
                const data = await uploadData(formData)

                if (data.status === 200) {
                  setIsUploading(false);
                  setShowChatbox(true)
                }
              }
            }}
          />
        </label>
        {file && (
          <p className="px-4 py-1 mt-2 border-2 border-[#6651F5] rounded-2xl text-[#6651F5]">
            {file.name}
          </p>
        )}
        {isUploading && (
          <div className="flex gap-2 items-center">
            <RotatingLines
              strokeColor="#6651F5"
              strokeWidth="5"
              animationDuration="0.75"
              width="25"
              visible={true}
            />
            <p className="text-[#6651F5]">Analyzing your file...</p>
          </div>
        )}
      </div>
      {showChatbox && <Chatbox messages={messages} setMessages={setMessages}/>}
    </div>
  );
}
