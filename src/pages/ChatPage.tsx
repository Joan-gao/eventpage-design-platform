import React, { useState , useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/scrollbar.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes , faCircleUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NotificationArgsProps, notification , Image, Flex, Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

interface Props {}
type NotificationPlacement = NotificationArgsProps["placement"];
const ChatPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imgId, setImgId] = useState<string | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  // 辅助状态，用来强制组件重新渲染
  const [, setForceRender] = useState(0);
  const location = useLocation();
  const previewData = location.state?.data;
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification`,
      description: "Please Enter Prompt before Generating",
      placement,
    });
  };

  // Show Image Preview and Enable 'Select' Button
  const handleEdit = async (imageId: string) => {
    const imgElement = document.getElementById(imageId) as HTMLImageElement;
    const selectDesign = document.getElementById('selectDesign');
    const EditBTN = document.getElementById('EditBTN');
    const RegenerateBTN = document.getElementById('RegenerateBTN');

    if (selectDesign) {
      selectDesign.style.opacity = "1";
      selectDesign.style.cursor = "pointer";
      selectDesign.setAttribute("aria-disabled", "false");
    }

    if (imgElement) {
      setPreviewImage(imgElement.src);
      setIsPreviewVisible(true);
      setImgId(imageId);
    }
    
    if (RegenerateBTN) {
      RegenerateBTN.style.opacity = "0.6";
      RegenerateBTN.style.cursor = "default";
      RegenerateBTN.setAttribute("aria-disabled", "true");
    }

    if (EditBTN) {
      EditBTN.style.right = '34%';
      EditBTN.style.opacity = "1";
      EditBTN.style.cursor = "pointer";
      EditBTN.setAttribute("aria-disabled", "false");
    }
  };

  // Edit Image based the new prompt entered by user
  const handleApplyEdit = async () => {
    const loading = document.getElementById('loading');
    
    if (!isPreviewVisible) {
      return;
    }

    if (loading) {
      loading.style.display = "block";
    }

    if (loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (!inputValue || inputValue.trim() === "") {
      openNotification("top");
    } else {
      if (previewImage) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/edit",
            { prompt: inputValue, imageUrl: previewImage },

            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          if (response.data.response.images) {
            if (imgId === "Design1") {
              previewData.img1 = response.data.response.images;
            } else if (imgId === "Design2") {
              previewData.img2 = response.data.response.images;
            } else if (imgId === "Design3") {
              previewData.img3 = response.data.response.images;
            } else {
              previewData.img4 = response.data.response.images;
            }
          }
          previewData.prompt = inputValue;
          setInputValue("");
          setIsPreviewVisible(false);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    }

    if (loading) {
      loading.style.display = "none";
    }
  };

  
  // Closing Preview and Disabling 'Select' Button
  const handleClosePreview = () => {
    setIsPreviewVisible(false);
    setPreviewImage(null);
    const selectDesign = document.getElementById('selectDesign');
    const EditBTN = document.getElementById('EditBTN');
    const RegenerateBTN = document.getElementById('RegenerateBTN');


    if (selectDesign) {
      selectDesign.style.opacity = "0.6";
      selectDesign.style.cursor = "default";
      selectDesign.setAttribute("aria-disabled", "true");
    }

    if(EditBTN) {
      EditBTN.style.right = "4%";
      EditBTN.style.opacity = "0.6";
      EditBTN.style.cursor = "default"
      EditBTN.setAttribute("aria-disabled", "true");
    }

    if(RegenerateBTN) {
      RegenerateBTN.style.opacity = "1";
      RegenerateBTN.style.cursor = "pointer"
      RegenerateBTN.setAttribute("aria-disabled", "false");
    }
  };

  // Regenerate based on previous prompt
  const handleRege = async () => {
    const loading = document.getElementById('loading');
    const EditBTN = document.getElementById('EditBTN');

    if (isPreviewVisible) {
      return;
    }
    
    if (loading) {
      loading.style.display = "block";
    }

    if (loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Check if prompt, model, and aspectRatio are populated
    console.log(previewData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/re-generate",
        { message: previewData },

        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.response.images) {
        previewData.img1 = response.data.response.images[0];
        previewData.img2 = response.data.response.images[1];
        previewData.img3 = response.data.response.images[2];
        previewData.img4 = response.data.response.images[3];

        // Update the auxiliary state to force the component to re-render
        setForceRender((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    if (EditBTN) {
      EditBTN.style.right = '4%';
    }

    if (loading) {
      loading.style.display = "none";
    }
  };

  // Bring Selected Images to the Final Design Page
  const handleSelectDesign = () => {
    if (previewImage) {
      navigate("/DesignPage", { state: { image: previewImage } });
    }
  };

  return (
    <div className="z-101 absolute top-0 h-screen w-screen grid place-items-center">
      <div id="loading" ref={loadingRef} className="hidden absolute top-0 w-full h-full bg-black opacity-50 z-50">
        <Flex gap="small" vertical>
          <Flex gap="small z">
            <div className="absolute inset-x-1/2 inset-y-1/2 z-50">
              <Spin tip="Loading"  size="large">
              </Spin>
              </div>
            </Flex>
          </Flex>
        </div>
      <div
        id="custom-scrollbar"
        className="w-375 h-667 max-h-full relative top-0 flex flex-col gap-3 place-items-center bg-[#240F14] rounded-25 snap-mandatory snap-y z-10 overflow-x-hidden overflow-scroll"
      >
        {/* Navigation to previous page and Page Title */}
        <div className=" w-4/5 h-[48px] flex items-center gap">
          <div className="relative top-0 left-0 h-[48px] flex items-center z-10 z-10">
            <Link to="/GenerationPage">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-base text-white cursor-pointer"
              />
            </Link>
          </div>
          <h2 className="flex m-auto relative text-left text-sm font-medium text-white text-shadow py-0">
            Event Chat Page
          </h2>
        </div>

        <div className="flex flex-col w-4/5 gap-2">
          {/* Ai Text Responses */}
          <p className="text-[#CC8F99]">AI Bot</p>
          <div className="text-white text-base text-left bg-[#4A2129] border-none rounded-xl h-fit px-3 py-3">
            <p className="text-white text-sm">
              {previewData ? previewData.prompt : null}
            </p>
          </div>

          {/* Ai Design Output (4 designs) */}
          <div className="grid grid-cols-2 gap-3 mt-3.5">
            {previewData && previewData.img1 && (
              <div className="flex flex-col h-fit relative overflow-hidden">
                <Image
                  className="w-full h-full overflow-hidden"
                  src={previewData.img1}
                  alt="Generated Design"
                />
                <img
                  id="Design1"
                  className="hidden"
                  src={previewData.img1}
                  alt="Generated Design"
                />
                <button
                  className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                  onClick={() => handleEdit("Design1")}
                >
                  Edit
                </button>
              </div>
            )}

            {previewData && previewData.img2 && (
              <div className="flex flex-col h-fit relative overflow-hidden">
                <Image
                  className="w-full h-full overflow-hidden"
                  src={previewData.img2}
                  alt="Generated Design"
                />
                <img
                  id="Design2"
                  className="hidden"
                  src={previewData.img2}
                  alt="Generated Design"
                />
                <button
                  className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                  onClick={() => handleEdit("Design2")}
                >
                  Edit
                </button>
              </div>
            )}

            {previewData && previewData.img3 && (
              <div className="flex flex-col h-fit relative overflow-hidden">
                <Image
                  className="w-full h-full overflow-hidden"
                  src={previewData.img3}
                  alt="Generated Design"
                />
                <img
                  id="Design3"
                  className="hidden"
                  src={previewData.img3}
                  alt="Generated Design"
                />
                <button
                  className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                  onClick={() => handleEdit("Design3")}
                >
                  Edit
                </button>
              </div>
            )}

            {previewData && previewData.img4 && (
              <div className="flex flex-col h-fit relative overflow-hidden">
                <Image
                  className="w-full h-full overflow-hidden"
                  src={previewData.img4}
                  alt="Generated Design"
                />
                <img
                  id="Design4"
                  className="hidden"
                  src={previewData.img4}
                  alt="Generated Design"
                />
                <button
                  className="absolute bottom-2 right-2 z-10 text-white text-base bg-[#FC2B55] border-none rounded-md py-1.5 px-5"
                  onClick={() => handleEdit("Design4")}
                >
                  Edit
                </button>
              </div>
            )}

          </div>
        </div>

          {/* User Interaction Section */}
          <div className="bg-[#240F14] items-center flex flex-col w-full gap-3 z-20 py-3 m-0">
            <div className="flex flex-row w-4/5 gap-3">
              {/* Select and Regenerate Buttons */}
              <button
                id="selectDesign"
                onClick={handleSelectDesign}
                className="bg-[#FC2B55] text-white text-center w-1/2 border-none rounded-md py-1.5 px-6 opacity-60 cursor-default"
                aria-disabled="true"
              >
                Select
              </button>

              <button 
                id="RegenerateBTN"
                onClick={handleRege}
                className="bg-[#4A2129] text-white text-center w-1/2 border-none rounded-md py-1.5 px-6 opacity-100 cursor-pointer"
                aria-disabled="false"
              >
                Regenerate
              </button>
            </div>
            <div className="relative flex flex-row w-4/5 gap-3 items-center">
              {/* User Prompt box */}
              <textarea
                id="userPrompt"
                className="text-white text-sm text-left bg-[#4A2129] border-none rounded-md w-full h-full min-h-24 py-1.5 px-3"
                placeholder="Enter your text here"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInputValue(e.target.value)
                }
              />
              <button
                id="EditBTN"
                className='absolute right-[4%] bottom-[2%] z-20 cursor-default opacity-60'
                onClick={handleApplyEdit}
                aria-disabled="true"
              >
                <FontAwesomeIcon icon={faCircleUp} className="text-base text-white"/>
              </button>


              {/* Preview of Sele cted Image */}
              {isPreviewVisible && (
                <div className="w-2/5 h-2/5 flex items-center justify-center bg-opacity-75">
                  <div className="flex relative rounded-lg">
                    <button
                      className="absolute top-[-6px] right-[6px] text-gray-500 z-20 bg-white rounded-sm rotate-90"
                      onClick={handleClosePreview}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <img
                      id="previewImage"
                      src={previewImage!}
                      alt="Preview"
                      className="max-w-full max-h-full rounded-md z-10"
                    />
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
