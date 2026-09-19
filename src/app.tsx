import { RouterProvider } from "react-router-dom";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/react";
import router from "./app/router";
import Providers from "./app/providers";

// The /love/<token> URL carries personal data (name, sender, message),
// so only the generic path is ever sent to the analytics service.
function stripToken(event: BeforeSendEvent) {
  const url = new URL(event.url);
  url.pathname = url.pathname.replace(/^\/love\/.*/, "/love");
  url.search = "";
  url.hash = "";
  return { ...event, url: url.toString() };
}

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
      <Analytics beforeSend={stripToken} />
    </Providers>
  );
}

export default App;
