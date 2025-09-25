import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
    <div class="text-center">
      <h1 class="mb-4 text-6xl font-semibold text-primary">404</h1>
      <p class="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
      <p class="mt-4 text-gray-600">
        Let's get you back{" "}
        <a href="/" class="text-primary">
          home
        </a>
        .
      </p>
    </div>
    </div>
  );
};

export default NotFoundPage;
