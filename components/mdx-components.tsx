import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Callout } from "./callout";

//compiles the MDX string into a React component.
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
};

interface MdxProps {
  code: string;
}

// renders the compiled component, passing custom components like Image for use inside the MDX.
export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
