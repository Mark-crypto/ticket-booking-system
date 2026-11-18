// framer-motion's animation engine, loaded as a separate file *after* the
// page first renders (see LazyMotion in App.tsx). domMax includes layout
// animations, which we use for the sliding vibe highlight and the carousel.
import { domMax } from "framer-motion"

export default domMax
