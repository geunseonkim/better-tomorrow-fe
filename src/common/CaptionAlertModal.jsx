import React from "react";

const CaptionAlertModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white/80 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-2">자막이 없습니다</h2>
        <p className="text-sm text-gray-600 mb-4">
          자막이 포함된 YouTube 영상을 입력해주세요. <br />
          YouTube에서 <strong>자막(CC)</strong> 버튼이 활성화된 영상을
          확인해보세요.
        </p>
        <button
          onClick={onClose}
          className="btn btn-neutral w-full mt-2 hover:bg-neutral-800"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CaptionAlertModal;
