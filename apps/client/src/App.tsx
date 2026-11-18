import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LazyMotion, MotionConfig } from "framer-motion"

import { MainLayout } from "@/components/layout/MainLayout"
import { LandingPage } from "@/pages/LandingPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

// Animation features download separately, after first paint (smaller initial JS)
const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default)

function App() {
  return (
    // LazyMotion + `m.` components instead of `motion.` keeps framer-motion's
    // engine out of the main bundle. `strict` throws if a `motion.` sneaks in.
    <LazyMotion features={loadMotionFeatures} strict>
      {/* reducedMotion="user": skip transform/layout animations for people who
          turned on "reduce motion" in their OS settings */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            {/* Every route inside MainLayout gets the Navbar + Footer */}
            <Route element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              {/* Add /events, /events/:id, /login, /register here as you build them */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LazyMotion>
  )
}

export default App
