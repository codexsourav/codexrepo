import React from "react";

function Test({ count }: { count: any }) {
    return (
        <div>{count}</div>
    )
}
export default React.memo(Test);