export function isSsr() {
  return navigator.userAgent === "ReactSnap";
}

type NoSsrProps = {
  children: React.ReactNode;
};

export function NoSsr(props: NoSsrProps) {
  if (isSsr()) {
    return null;
  }

  return <>{props.children}</>;
}
