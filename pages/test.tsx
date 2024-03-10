import React from "react";

export default function Test() {
  return (
    <div className="flex flex-col justify-center gap-4 p-4">

      <div>
        <h2 className="text-2xl font-bold">Test</h2>
        <p>
          This is a test page. It is not linked from the main navigation, but
          can be accessed by typing the URL directly.

          If process.env.NEXT_PUBLIC_SHOW_NEWS is set to "true", the News section is shown below
        </p>
      </div>


      {process.env.NEXT_PUBLIC_SHOW_NEWS === "true" && (
        <div>
          <h2 className="text-2xl font-bold">News</h2>
        </div>
      )}
    </div>
  );
}
