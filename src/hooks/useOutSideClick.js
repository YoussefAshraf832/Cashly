import { useEffect, useRef } from "react";

export function useOutsideClick(fn, capturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (
          ref.current &&
          !ref.current.contains(e.target) //&&
          //!e.target.closest(".toggle") // opcitional
        )
          fn();
      }
      document.addEventListener("click", handleClick, capturing);

      return () =>
        document.removeEventListener("click", handleClick, capturing);
    },
    [fn, capturing]
  );
  return ref;
}
