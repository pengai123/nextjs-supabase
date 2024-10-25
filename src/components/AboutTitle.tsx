"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

export default function AboutTitle() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ["Website Design", "Website Hosting", "Domain Setup", "Business Email", "SSL Certificate", "Authentication"],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <h1 className="text-4xl md:text-6xl max-w-3xl tracking-tighter text-center font-regular">
      <span >Everything you need for your success</span>
      <span className="relative flex w-full justify-center overflow-hidden text-custom-blue text-center md:pb-4 md:pt-1">
        &nbsp;
        {titles.map((title, index) => (
          <motion.span
            key={index}
            className="absolute font-semibold"
            initial={{ opacity: 0, y: "-100" }}
            transition={{ type: "spring", stiffness: 50 }}
            animate={
              titleNumber === index
                ? {
                  y: 0,
                  opacity: 1,
                }
                : {
                  y: titleNumber > index ? -150 : 150,
                  opacity: 0,
                }
            }
          >
            {title}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}