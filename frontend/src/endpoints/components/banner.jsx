import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

export default function BannerAlert() {
  const [show, setShow] = useState(true);

  return (
    <div className="container pt-4" data-bs-theme="dark">
      {show && (
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          Твоя реклама может быть здесь, но у тебя нет денег
        </Alert>
      )}
    </div>
  );
}
