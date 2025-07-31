import { motion } from "framer-motion";

interface Props {
  img: string;
  title: string;
  desc: string;
  delay?: number;
  sizeMobile?: number;
  sizeDesktop?: number;
}

export default function RoundImageCard({
  img, title, desc, delay = 0, sizeMobile = 210, sizeDesktop = 340,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.1, delay, ease: "easeOut" }}
      className="flex flex-col items-center w-full"
    >
      <div
        className="
          rounded-full overflow-hidden
          shadow-[0_12px_32px_rgba(64,64,100,0.17)]
          border-4 border-[#f7eee2]
          flex items-center justify-center
          bg-white
        "
        style={{
          width: `clamp(${sizeMobile}px, 32vw, ${sizeDesktop}px)`,
          height: `clamp(${sizeMobile}px, 32vw, ${sizeDesktop}px)`,
          minWidth: sizeMobile,
          minHeight: sizeMobile,
          maxWidth: sizeDesktop,
          maxHeight: sizeDesktop,
        }}
      >
        <img
          src={img}
          alt={title}
          className="object-cover w-full h-full"
          draggable={false}
        />
      </div>
      <div className="w-[2px] h-10 bg-gray-200 my-4" />
      <div className="text-center px-2 w-full max-w-[420px]">
        <div className="text-xl sm:text-2xl md:text-2xl mb-2" style={{ color: "#222", fontWeight: 500 }}>
          {title}
        </div>
        <div className="text-base sm:text-lg text-[#3a3a3a]" style={{ fontWeight: 400 }}>
          {desc}
        </div>
      </div>
    </motion.div>
  );
}
