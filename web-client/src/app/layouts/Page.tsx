import * as  React from "react";

const Page = (props) => {
  return (
    <div style={props.styles.pageContent}>
      {props.children}
    </div>
  )
}
export default Page;