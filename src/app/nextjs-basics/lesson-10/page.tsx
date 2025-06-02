'use client';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  IconButton,
  Switch,
  TextField,
  Badge,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Store,
  Memory,
  Speed,
  CheckCircle,
  Code,
  Add,
  Remove,
  Delete,
  ShoppingCart,
  Person,
  Settings,
  Refresh,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      aria-labelledby={`lesson-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Lesson10Page() {
  const [activeTab, setActiveTab] = useState(0);
  
  // Demo states
  const [count, setCount] = useState(0);
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([
    { id: 1, name: 'MacBook Pro', price: 59900, quantity: 1 },
    { id: 2, name: 'iPhone 15', price: 32900, quantity: 2 }
  ]);
  const [user, setUser] = useState({ name: 'John Doe', theme: 'light' });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const addToCart = (item: {name: string, price: number}) => {
    const existingItem = cartItems.find(i => i.name === item.name);
    if (existingItem) {
      setCartItems(cartItems.map(i => 
        i.id === existingItem.id 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      setCartItems([...cartItems, { 
        id: Date.now(), 
        name: item.name, 
        price: item.price, 
        quantity: 1 
      }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics"
            sx={{ mb: 2 }}
          >
            กลับไปหน้าหลัก
          </Button>
          
          <Typography variant="h1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Store color="primary" sx={{ fontSize: '3rem' }} />
            บทที่ 10: State Management (Zustand)
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip icon={<Store />} label="Zustand Store" color="primary" />
            <Chip icon={<Memory />} label="Persist Middleware" color="secondary" />
            <Chip icon={<Speed />} label="DevTools" color="info" />
            <Chip icon={<Code />} label="TypeScript" color="success" />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              ⏱️ <strong>ระยะเวลา:</strong> 45 นาที | 
              📊 <strong>ระดับ:</strong> ปานกลาง | 
              🎯 <strong>เป้าหมาย:</strong> เรียนรู้การจัดการ global state ด้วย Zustand อย่างมีประสิทธิภาพ
            </Typography>
          </Alert>
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="🚀 Zustand คืออะไร?" />
            <Tab label="📦 การติดตั้ง" />
            <Tab label="🏪 Store พื้นฐาน" />
            <Tab label="🔄 Actions & Updates" />
            <Tab label="💾 Persist Middleware" />
            <Tab label="🛠️ DevTools" />
            <Tab label="📱 Demo" />
          </Tabs>
        </Paper>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h3" sx={{ mb: 3 }}>🚀 Zustand คืออะไร?</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Zustand เป็น state management library ที่เล็ก เร็ว และใช้งานง่ายสำหรับ React 
            ไม่ต้อง boilerplate code เยอะๆ เหมือน Redux
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
                  ✅ ข้อดีของ Zustand
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="เล็กและเร็ว (2.9kb gzipped)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ไม่ต้อง Provider wrapper" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="TypeScript support ดีเยี่ยม" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="ใช้งานง่าย ไม่ซับซ้อน" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle color="success" sx={{ fontSize: 20 }} /></ListItemIcon>
                    <ListItemText primary="มี middleware เยอะ" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'info.main' }}>
                  🆚 เทียบกับ Redux
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>Redux:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    • ต้อง actions, reducers, dispatch<br/>
                    • ต้อง Provider wrapper<br/>
                    • Boilerplate code เยอะ<br/>
                    • เหมาะกับ app ใหญ่ๆ
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>Zustand:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    • เขียน logic ตรงไปตรงมา<br/>
                    • ไม่ต้อง Provider<br/>
                    • Code น้อย เข้าใจง่าย<br/>
                    • เหมาะกับ app ทุกขนาด
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>ใช้ Zustand เมื่อไหร่?</strong> เมื่อต้องการแชร์ state ระหว่าง components ที่ไม่ใช่ parent-child 
              หรือต้องการจัดการ global state แบบง่ายๆ
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h3" sx={{ mb: 3 }}>📦 การติดตั้ง Zustand</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>1. ติดตั้ง Package</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`npm install zustand

# หรือใช้ yarn
yarn add zustand

# หรือใช้ pnpm  
pnpm add zustand`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>2. Optional Dependencies</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`# สำหรับ persist middleware (เก็บข้อมูลใน localStorage)
npm install zustand/middleware

# สำหรับ DevTools (debug ใน browser)
npm install @redux-devtools/extension`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>3. TypeScript Types</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Zustand มี TypeScript types built-in แล้ว ไม่ต้องติดตั้งเพิ่ม! 🎉
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>เริ่มต้นง่ายๆ:</strong> แค่ `npm install zustand` ก็เริ่มใช้งานได้แล้ว 
              middleware อื่นๆ ค่อยเพิ่มทีหลังเมื่อต้องการ
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h3" sx={{ mb: 3 }}>🏪 การสร้าง Store พื้นฐาน</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>Store แรกของเรา</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// stores/counterStore.ts
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>การใช้งานใน Component</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// components/Counter.tsx
'use client'
import { useCounterStore } from '@/stores/counterStore'

export function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// หรือใช้ selector เพื่อ optimize performance
export function CounterDisplay() {
  const count = useCounterStore((state) => state.count)
  
  return <h2>Count: {count}</h2>
}

export function CounterButtons() {
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  
  return (
    <div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  )
}`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>ทำไมต้องใช้ Selector?</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>❌ ไม่ดี</Typography>
                <Box className="code-block" sx={{ p: 2, borderRadius: 1 }}>
                  <Typography variant="body2" component="pre">
{`// re-render ทุกครั้งที่ store เปลี่ยน
const { count, increment, decrement } = useCounterStore()`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'success.main' }}>✅ ดี</Typography>
                <Box className="code-block" sx={{ p: 2, borderRadius: 1 }}>
                  <Typography variant="body2" component="pre">
{`// re-render เฉพาะเมื่อ count เปลี่ยน
const count = useCounterStore((state) => state.count)`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Performance Tip:</strong> ใช้ selector เมื่อต้องการเฉพาะบางค่าจาก store 
              จะทำให้ component re-render เฉพาะเมื่อค่าที่เราต้องการเปลี่ยนเท่านั้น
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant="h3" sx={{ mb: 3 }}>🔄 Actions และ State Updates</Typography>
          
          <Typography variant="h5" sx={{ mb: 2 }}>การอัพเดต State แบบต่างๆ</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// stores/userStore.ts
import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  age: number
}

interface UserState {
  user: User | null
  users: User[]
  loading: boolean
  // Actions
  setUser: (user: User) => void
  updateUserName: (name: string) => void
  addUser: (user: User) => void
  removeUser: (id: string) => void
  setLoading: (loading: boolean) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  users: [],
  loading: false,
  
  // การตั้งค่า user ใหม่
  setUser: (user) => set({ user }),
  
  // การอัพเดตแค่บางฟิลด์
  updateUserName: (name) => set((state) => ({
    user: state.user ? { ...state.user, name } : null
  })),
  
  // การเพิ่ม item ใน array
  addUser: (user) => set((state) => ({
    users: [...state.users, user]
  })),
  
  // การลบ item จาก array
  removeUser: (id) => set((state) => ({
    users: state.users.filter(user => user.id !== id)
  })),
  
  // การตั้งค่า loading state
  setLoading: (loading) => set({ loading }),
  
  // การ reset state
  clearUser: () => set({ user: null, users: [] }),
}))`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>Async Actions</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// การเพิ่ม async functions ใน store
export const useUserStore = create<UserState>((set, get) => ({
  // ... state และ actions อื่นๆ
  
  // Async action สำหรับดึงข้อมูล user
  fetchUser: async (id: string) => {
    set({ loading: true })
    try {
      const response = await fetch(\`/api/users/\${id}\`)
      const user = await response.json()
      set({ user, loading: false })
    } catch (error) {
      console.error('Error fetching user:', error)
      set({ loading: false })
    }
  },
  
  // Async action สำหรับบันทึกข้อมูล
  saveUser: async (userData: Partial<User>) => {
    const { user } = get() // ดึง current state
    if (!user) return
    
    set({ loading: true })
    try {
      const response = await fetch(\`/api/users/\${user.id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      const updatedUser = await response.json()
      set({ user: updatedUser, loading: false })
    } catch (error) {
      console.error('Error saving user:', error)
      set({ loading: false })
    }
  }
}))`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>การใช้งาน get() Function</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`// get() ใช้สำหรับอ่าน current state ใน action
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (product: Product) => {
    const { items } = get() // อ่าน current state
    const existingItem = items.find(item => item.id === product.id)
    
    if (existingItem) {
      // ถ้ามีอยู่แล้ว เพิ่ม quantity
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      })
    } else {
      // ถ้ายังไม่มี เพิ่มใหม่
      set({
        items: [...items, { ...product, quantity: 1 }]
      })
    }
  },
  
  getTotalPrice: () => {
    const { items } = get()
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}))`}
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>เทคนิค:</strong> ใช้ `get()` เมื่อต้องการอ่าน current state ใน action 
              และใช้ `set()` เมื่อต้องการอัพเดต state
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <Typography variant="h3" sx={{ mb: 3 }}>💾 Persist Middleware</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Persist middleware ช่วยให้เราเก็บ state ไว้ใน localStorage, sessionStorage 
            หรือ storage อื่นๆ ทำให้ข้อมูลไม่หายเมื่อ refresh หน้า
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>การติดตั้ง</Typography>
          <Box className="code-block" sx={{ p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" component="pre">
{`npm install zustand`}
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 2 }}>การใช้งาน Persist</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`// stores/settingsStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsState {
  theme: 'light' | 'dark'
  language: 'th' | 'en'
  notifications: boolean
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: 'th' | 'en') => void
  toggleNotifications: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'th',
      notifications: true,
      
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleNotifications: () => set((state) => ({ 
        notifications: !state.notifications 
      })),
    }),
    {
      name: 'app-settings', // ชื่อ key ใน localStorage
      storage: createJSONStorage(() => localStorage), // เลือก storage
    }
  )
)`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>การตั้งค่า Persist แบบขั้นสูง</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      // ... actions
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => localStorage),
      
      // เลือกว่าจะ persist ฟิลด์ไหนบ้าง
      partialize: (state) => ({ items: state.items }),
      
      // กำหนดเวอร์ชัน สำหรับ migration
      version: 1,
      
      // migration function สำหรับเปลี่ยนโครงสร้างข้อมูล
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // migration จากเวอร์ชัน 0 เป็น 1
          return {
            ...persistedState,
            items: persistedState.products || []
          }
        }
        return persistedState
      },
      
      // custom serialization
      serialize: (state) => JSON.stringify(state),
      deserialize: (str) => JSON.parse(str),
    }
  )
)`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>การใช้ sessionStorage</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`// สำหรับข้อมูลที่ต้องการเก็บแค่ session เดียว
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      // state และ actions
    }),
    {
      name: 'session-data',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)`}
            </Typography>
          </Paper>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>ระวัง:</strong> อย่า persist ข้อมูลที่มี sensitive data เช่น passwords, tokens 
              ใน localStorage เพราะสามารถถูกอ่านได้ผ่าน JavaScript
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          <Typography variant="h3" sx={{ mb: 3 }}>🛠️ DevTools Integration</Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Zustand สามารถใช้ Redux DevTools ได้ ทำให้เราสามารถ debug state changes ได้ง่าย
          </Typography>

          <Typography variant="h5" sx={{ mb: 2 }}>การติดตั้ง DevTools</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
{`# ติดตั้ง Redux DevTools Extension ใน browser ก่อน
# Chrome: Redux DevTools
# Firefox: Redux DevTools

# ไม่ต้องติดตั้ง package เพิ่ม Zustand support อยู่แล้ว!`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>การใช้งาน DevTools</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), 'increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), 'decrement'),
    }),
    {
      name: 'counter-store', // ชื่อที่แสดงใน DevTools
    }
  )
)`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>การใช้ DevTools ร่วมกับ Persist</Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        // state และ actions
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'user-store',
    }
  )
)`}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mb: 2 }}>การใช้งาน DevTools</Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="เปิด Browser DevTools (F12)" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ไปที่ tab Redux" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="เลือก store ที่ต้องการดู" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="ดู state changes, actions, time travel" />
            </ListItem>
          </List>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Production:</strong> DevTools จะทำงานเฉพาะใน development mode เท่านั้น 
              จะไม่มีผลกระทบต่อ production build
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={6}>
          <Typography variant="h3" sx={{ mb: 3 }}>📱 Interactive Demo</Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
            {/* Counter Demo */}
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3 }}>Counter Store Demo</Typography>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h3" sx={{ mb: 2 }}>{count}</Typography>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => setCount(count + 1)}
                    >
                      +1
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Remove />}
                      onClick={() => setCount(count - 1)}
                    >
                      -1
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Refresh />}
                      onClick={() => setCount(0)}
                    >
                      Reset
                    </Button>
                  </Stack>
                </Box>
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    นี่คือตัวอย่างการใช้ Zustand store สำหรับ counter
                  </Typography>
                </Alert>
              </CardContent>
            </Card>

            {/* User Settings Demo */}
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3 }}>Settings Store Demo</Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>ธีม:</Typography>
                    <Switch
                      checked={user.theme === 'dark'}
                      onChange={(e) => setUser({
                        ...user,
                        theme: e.target.checked ? 'dark' : 'light'
                      })}
                      inputProps={{ 'aria-label': 'theme toggle' }}
                    />
                  </Box>
                  <TextField
                    label="ชื่อผู้ใช้"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    size="small"
                    fullWidth
                  />
                  <Chip
                    icon={<Person />}
                    label={`Theme: ${user.theme}, User: ${user.name}`}
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    ข้อมูลนี้จะถูกเก็บใน localStorage (Persist)
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Box>

          {/* Shopping Cart Demo */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShoppingCart />
                Shopping Cart Store Demo
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCart />
                </Badge>
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>สินค้าในตะกร้า</Typography>
                  {cartItems.length === 0 ? (
                    <Alert severity="info">ตะกร้าว่างเปล่า</Alert>
                  ) : (
                    <Stack spacing={2}>
                      {cartItems.map((item) => (
                        <Card key={item.id} variant="outlined">
                          <CardContent sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  ฿{item.price.toLocaleString()} × {item.quantity}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h6">
                                  ฿{(item.price * item.quantity).toLocaleString()}
                                </Typography>
                                <IconButton
                                  color="error"
                                  onClick={() => removeFromCart(item.id)}
                                  size="small"
                                >
                                  <Delete />
                                </IconButton>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>เพิ่มสินค้า</Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => addToCart({ name: 'iPad Air', price: 22900 })}
                    >
                      เพิ่ม iPad Air (฿22,900)
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => addToCart({ name: 'AirPods Pro', price: 8990 })}
                    >
                      เพิ่ม AirPods Pro (฿8,990)
                    </Button>
                    <Divider />
                    <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                      <Typography variant="h6" textAlign="center">
                        รวม: ฿{getTotalPrice().toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>ยินดีด้วย!</strong> คุณได้เรียนรู้การใช้ Zustand สำหรับจัดการ state แล้ว
              ตอนนี้คุณสามารถสร้าง global state ที่มีประสิทธิภาพได้แล้ว! 🎉
            </Typography>
          </Alert>
        </TabPanel>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            href="/nextjs-basics/lesson-9"
            variant="outlined"
          >
            บทที่ 9: Authentication
          </Button>
          
          <Chip 
            label={`${activeTab + 1} / 7`}
            color="primary"
            variant="outlined"
          />
          
          <Button
            endIcon={<ArrowForward />}
            component={Link}
            href="/nextjs-basics/lesson-11"
            variant="outlined"
            disabled
          >
            บทที่ 11: Forms
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 