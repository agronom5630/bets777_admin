import React from "react";
import Image from "next/image";

export const AcmeIcon = () => {
  return (
    <Image
      src="/images/777.png"
      alt="Acme"
      width={56}
      height={56}
      className="rounded-full"
    />
  );
};
