import dynamic from 'next/dynamic';
import React from 'react';

type NoSSRWrapperProps = {
  children: React.ReactNode;
};
const NoSSRWrapper = (props: NoSSRWrapperProps) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
