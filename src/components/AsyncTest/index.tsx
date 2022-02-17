import { useEffect, useState } from "react";

export function AsyncTest() {
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true)
    }, 1000)
  }, [])

  return(
    <div>
      <div>Hello AsynTest Component</div>
      {isButtonVisible && ( <button>Button</button>  )}
      {!isButtonVisible && ( <button>Button2</button>  )}
    </div>
  )
}