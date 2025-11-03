// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function useNavigationBlock(active) {
//   const router = useRouter();

//   useEffect(() => {
//     if (!active) return;

//     const handleBeforeUnload = (e) => {
//       e.preventDefault();
//       e.returnValue = "";
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     const handlePopState = (e) => {
//       e.preventDefault();
//       const confirmLeave = window.confirm("Unsaved changes will be lost. Continue?");
//       if (!confirmLeave) {
//         history.pushState(null, "", window.location.href);
//       }
//     };

//     window.addEventListener("popstate", handlePopState);
//     history.pushState(null, "", window.location.href);

//     const originalPush = router.push;
//     const originalReplace = router.replace;

//     router.push = async (url, ...args) => {
//       const confirmLeave = window.confirm("Unsaved changes will be lost. Continue?");
//       if (confirmLeave) return originalPush(url, ...args);
//     };

//     router.replace = async (url, ...args) => {
//       const confirmLeave = window.confirm("Unsaved changes will be lost. Continue?");
//       if (confirmLeave) return originalReplace(url, ...args);
//     };

//     const handleClick = (e) => {
//       const link = e.target.closest("a");
//       if (!link) return;

//       const href = link.getAttribute("href");
//       if (!href || href.startsWith("http")) return;

//       const confirmLeave = window.confirm("Unsaved changes will be lost. Continue?");
//       if (!confirmLeave) {
//         e.preventDefault();
//         e.stopPropagation();
//       }
//     };

//     document.addEventListener("click", handleClick, true);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       window.removeEventListener("popstate", handlePopState);
//       document.removeEventListener("click", handleClick, true);

//       router.push = originalPush;
//       router.replace = originalReplace;
//     };
//   }, [active]);
// }








"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNavigationConfirmStore } from "../store/navigationConfirmStore";

export default function useNavigationBlock(active) {
  const router = useRouter();
  const askConfirm = useNavigationConfirmStore((s) => s.askConfirm);

  useEffect(() => {
    if (!active) return;

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (url, ...args) => {
      askConfirm(() => originalPush(url, ...args));
    };

    router.replace = (url, ...args) => {
      askConfirm(() => originalReplace(url, ...args));
    };

    const handleLink = (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.href;

      if (!href || href.startsWith("http")) return;

      e.preventDefault();
      askConfirm(() => router.push(href));
    };

    document.addEventListener("click", handleLink, true);

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
      document.removeEventListener("click", handleLink, true);
    };
  }, [active]);
}
