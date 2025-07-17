import { Home, Target, Bitcoin, Receipt, Settings, TrendingUp } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar'

interface AppSidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

const menuItems = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: Home,
  },
  {
    title: 'Savings Goals',
    url: 'savings-goals',
    icon: Target,
  },
  {
    title: 'Bitcoin Portfolio',
    url: 'bitcoin-portfolio',
    icon: Bitcoin,
  },
  {
    title: 'Transactions',
    url: 'transactions',
    icon: Receipt,
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: Settings,
  },
]

export function AppSidebar({ currentPage, onPageChange }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40 p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bitcoin-gradient rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">BitcoinNest</h1>
            <p className="text-xs text-muted-foreground">Down Payment Savings</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onPageChange(item.url)}
                    isActive={currentPage === item.url}
                    className="w-full"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}