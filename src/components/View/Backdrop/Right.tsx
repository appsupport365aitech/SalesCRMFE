import gsap, { Power4 } from "gsap";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children, bool, pad, width }: any) => {
  const [open, setOpen] = useState(true);

  const backdrop: any = useRef();

  React.useEffect(() => {
    // if (open) {
    //   gsap.fromTo(
    //     container.current,
    //     {
    //       clipPath: "inset(0px 0px 100% 1px)",
    //     },
    //     {
    //       clipPath: "inset(0px 0px 0% 1px)",
    //       duration: 1.7,
    //       ease: Power4.easeInOut,
    //     }
    //   );
    // } else {
    //   gsap.fromTo(
    //     container.current,
    //     {
    //       clipPath: "inset(0px 0px 0% 1px)",
    //     },
    //     {
    //       clipPath: "inset(0px 0px 100% 1px)",
    //       duration: 1.7,
    //       ease: Power4.easeInOut,
    //     }
    //   );
    // }

    gsap.to(backdrop.current, {
      opacity: open ? 0.3 : 0,
      duration: 0.5,
    });

    // from={{
    //     clipPath: "inset(0px 0px 100% 1px)",
    //   }}
    //   to={{
    //     clipPath: !open
    //       ? "inset(0px 0px 100% 1px)"
    //       : "inset(0px 0px 0% 1px)",
    //   }}
    //   duration={1.7}
    //   ease={Power4.easeInOut}
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!bool) {
      close();
    }
  }, [bool]);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-[100%] h-[100%] z-100 overflow-auto"
        style={{
          zIndex: 99999999999999,
        }}
      >
        <div
          className="w-[100%] h-[100vh] absolute top-0 left-0 bg-black z-10 "
          style={{
            zIndex: 100,
            opacity: 0,
          }}
          onClick={() => {}}
          ref={backdrop}
        ></div>
        <div
          className="w-[100%] h-[100%] overflow-auto top-0 z-100 absolute flex justify-end "
          style={{
            zIndex: 1000,
            // padding: pad ? pad : "100px 0",
          }}
        >
          <motion.div
            className={`h-[100%] rounded-none  bg-white ml-80 py-[10px]  rounded-l-3xl`}
            style={{
              width: width ? width : "360px",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Backdrop);
