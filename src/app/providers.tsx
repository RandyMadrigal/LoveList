import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { MotionConfig } from "motion/react";
import I18nProvider from "../i18n/I18nProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <I18nProvider>
      {/* "user" turns transform/layout motion into plain fades when the OS asks for reduced motion */}
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster
          position="top-center"
          containerStyle={{ top: 84 }}
          toastOptions={{ style: { borderRadius: "999px", padding: "10px 18px" } }}
        />
      </MotionConfig>
    </I18nProvider>
  );
}
