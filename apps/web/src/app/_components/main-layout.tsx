import { Footer } from './footer'
import { Header } from './header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <Header />
      <div className="flex-1 overflow-visible">{children}</div>
      <Footer />
    </div>
  )
}
