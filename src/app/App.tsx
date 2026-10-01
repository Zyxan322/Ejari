import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react"
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useLocation,
  useParams,
} from "react-router"
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDashed,
  CircleHelp,
  CirclePause,
  Clock3,
  Copy,
  CreditCard,
  Download,
  Ellipsis,
  ExternalLink,
  FileCheck2,
  Eye,
  EyeOff,
  FileClock,
  FilePenLine,
  FileSearch,
  FileText,
  FolderOpen,
  Globe2,
  History,
  House,
  LayoutDashboard,
  Link2,
  ListFilter,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  PanelLeftClose,
  Plus,
  RefreshCw,
  RotateCw,
  Search,
  Send,
  Settings,
  Settings2,
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Sparkles,
  SquareArrowOutUpRight,
  TrendingUp,
  Upload,
  Users,
  Wifi,
  WifiOff,
  X,
  ZoomIn,
  ZoomOut,
  Camera,
  Image,
  TriangleAlert,
  ChartNoAxesCombined,
  CheckCircle2,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts"

type Case = {
  id: string
  property: string
  area: string
  tenant: string
  landlord: string
  type: string
  rent: number
  broker: string
  status: string
  updated: string
}
const initialCases: Case[] = [
  {
    id: "EJR-2026-004531",
    property: "Unit 1204, Marina Heights",
    area: "Dubai Marina",
    tenant: "Muhammad Ahmed",
    landlord: "Khalid Al Mansoori",
    type: "New Lease",
    rent: 125000,
    broker: "Sara Al Hashimi",
    status: "Validation",
    updated: "12 min ago",
  },
  {
    id: "EJR-2026-004530",
    property: "Unit 803, Downtown Views II",
    area: "Downtown Dubai",
    tenant: "Priya Sharma",
    landlord: "Fatima Al Nuaimi",
    type: "Renewal",
    rent: 180000,
    broker: "Omar Hassan",
    status: "Ready to Push",
    updated: "28 min ago",
  },
  {
    id: "EJR-2026-004529",
    property: "Villa 42, Arabian Ranches",
    area: "Arabian Ranches",
    tenant: "James Wilson",
    landlord: "Abdullah Al Falasi",
    type: "New Lease",
    rent: 260000,
    broker: "Sara Al Hashimi",
    status: "Intake",
    updated: "45 min ago",
  },
  {
    id: "EJR-2026-004528",
    property: "Unit 506, Park Heights",
    area: "Dubai Hills Estate",
    tenant: "Aisha Khan",
    landlord: "Mohammed Al Suwaidi",
    type: "New Lease",
    rent: 95000,
    broker: "Rami Khalil",
    status: "Registered",
    updated: "1 hour ago",
  },
  {
    id: "EJR-2026-004527",
    property: "Unit 2102, Princess Tower",
    area: "Dubai Marina",
    tenant: "Daniel Roberts",
    landlord: "Hessa Al Mazrouei",
    type: "Renewal",
    rent: 140000,
    broker: "Omar Hassan",
    status: "Rework",
    updated: "2 hours ago",
  },
  {
    id: "EJR-2026-004526",
    property: "Unit 1107, Creek Horizon",
    area: "Dubai Creek Harbour",
    tenant: "Sofia Martinez",
    landlord: "Saeed Al Maktoum",
    type: "New Lease",
    rent: 110000,
    broker: "Rami Khalil",
    status: "Awaiting Signature",
    updated: "2 hours ago",
  },
  {
    id: "EJR-2026-004525",
    property: "Unit 402, Belgravia III",
    area: "Jumeirah Village Circle",
    tenant: "Ali Hassan",
    landlord: "Noora Al Ali",
    type: "New Lease",
    rent: 78000,
    broker: "Sara Al Hashimi",
    status: "Push Failed",
    updated: "3 hours ago",
  },
  {
    id: "EJR-2026-004524",
    property: "Villa 18, Maple 2",
    area: "Dubai Hills Estate",
    tenant: "Olivia Thompson",
    landlord: "Ahmed Al Marri",
    type: "Renewal",
    rent: 225000,
    broker: "Omar Hassan",
    status: "Draft",
    updated: "Yesterday",
  },
]
const navItems: {
  label: string
  path: string
  icon: LucideIcon
  count?: string
}[] = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  {
    label: "Transactions",
    path: "/transactions",
    icon: FolderOpen,
    count: "128",
  },
  { label: "Intake Links", path: "/intake-links", icon: Link2 },
  { label: "Documents", path: "/documents", icon: FileText },
  { label: "Validation", path: "/validation", icon: ShieldCheck, count: "24" },
  { label: "Contracts", path: "/contracts", icon: FilePenLine },
  { label: "Payments & Cheques", path: "/payments", icon: CreditCard },
  { label: "Notifications", path: "/notifications", icon: Bell, count: "6" },
  { label: "Reports", path: "/reports", icon: ChartNoAxesCombined },
  { label: "Audit Trail", path: "/audit", icon: History },
  { label: "Administration", path: "/administration", icon: Settings2 },
]
type WorkspaceTheme = "sky" | "midnight"
type ChartPeriod = "This week" | "Last week"
const workspaceThemes: Record<
  WorkspaceTheme,
  {
    sidebar: string
    header: string
    sidebarBorder: string
    headerBorder: string
    active: string
    activeText: string
    accent: string
    badge: string
    badgeText: string
  }
> = {
  sky: {
    sidebar: "#0b1b31",
    header: "#10264a",
    sidebarBorder: "#1d3b60",
    headerBorder: "#244367",
    active: "#17365d",
    activeText: "#b8d9ff",
    accent: "#55aaff",
    badge: "#294c7b",
    badgeText: "#d5e8ff",
  },
  midnight: {
    sidebar: "#10172b",
    header: "#151e3a",
    sidebarBorder: "#2a3b62",
    headerBorder: "#344775",
    active: "#24365f",
    activeText: "#d0dcff",
    accent: "#8ca6ff",
    badge: "#334979",
    badgeText: "#dce5ff",
  },
}
const money = (value: number) => `AED ${value.toLocaleString("en-AE")}`
const fieldClass =
  "min-h-11 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
function Button({
  children,
  onClick,
  variant = "secondary",
  className = "",
  disabled,
  type = "button",
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "danger"
  className?: string
  disabled?: boolean
  type?: "button" | "submit"
}) {
  const variants = {
    primary: "border-primary bg-primary text-white shadow-sm hover:bg-blue-700",
    secondary: "border-border bg-white text-foreground hover:bg-slate-50",
    ghost:
      "border-transparent bg-transparent text-muted-foreground hover:bg-slate-100",
    danger: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors disabled:opacity-45 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
function IconButton({
  icon: Icon,
  label,
  onClick,
  className = "",
}: {
  icon: LucideIcon
  label: string
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-slate-100 ${className}`}
    >
      <Icon size={18} strokeWidth={1.7} />
    </button>
  )
}
function Badge({
  status,
  compact = false,
}: {
  status: string
  compact?: boolean
}) {
  let Icon: LucideIcon = CircleDashed
  let palette = "bg-slate-100 text-slate-600"
  if (
    [
      "Registered",
      "Accepted",
      "Done",
      "Verified",
      "Passed",
      "Delivered",
      "Submitted",
      "Active",
      "Paid",
      "Connected",
      "Confirmed",
    ].includes(status)
  ) {
    Icon = CircleCheck
    palette = "bg-emerald-50 text-emerald-700"
  } else if (
    [
      "Ready to Push",
      "Intake",
      "In Progress",
      "Validation",
      "Sent",
      "Opened",
      "Processing",
      "Push In Progress",
    ].includes(status)
  ) {
    Icon =
      status === "Validation"
        ? ShieldCheck
        : status === "Ready to Push"
          ? Send
          : Clock3
    palette = "bg-blue-50 text-blue-700"
  } else if (
    [
      "Rework",
      "Partial",
      "Action Needed",
      "Awaiting Signature",
      "Expiring",
      "Warning",
      "Scheduled",
      "Push Queued",
      "Pending",
    ].includes(status)
  ) {
    Icon =
      status === "Rework" || status === "Action Needed" ? TriangleAlert : Clock3
    palette = "bg-amber-50 text-amber-800"
  } else if (
    [
      "Push Failed",
      "Rejected",
      "Failed",
      "Expired",
      "Revoked",
      "Cancelled",
      "Hard Block",
      "Error",
    ].includes(status)
  ) {
    Icon = ShieldAlert
    palette = "bg-red-50 text-red-700"
  }
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium ${palette}`}
    >
      <Icon size={compact ? 11 : 12} strokeWidth={1.8} />
      {status}
    </span>
  )
}
function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-border bg-card shadow-[0_2px_4px_0_rgba(20,35,60,0.015)] ${className}`}
    >
      {children}
    </section>
  )
}
function CardHeader({
  title,
  subtitle,
  children,
  icon: Icon,
}: {
  title: string
  subtitle?: string
  children?: ReactNode
  icon?: LucideIcon
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4">
      <div>
        <h2 className="flex items-center gap-2 text-[14px] font-semibold">
          {Icon && <Icon size={16} />}
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-[11px] text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}
function PageHeader({
  title,
  subtitle,
  children,
  eyebrow,
}: {
  title: string
  subtitle: string
  children?: ReactNode
  eyebrow?: string
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            {eyebrow}
          </div>
        )}
        <h1 className="text-[26px] font-semibold tracking-[-0.5px] sm:text-[28px]">
          {title}
        </h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
function Empty({
  title = "No transactions found",
  text = "Try adjusting your search or filters.",
  icon: Icon = FolderOpen,
}: {
  title?: string
  text?: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
      <div className="mb-4 rounded-xl bg-slate-100 p-4">
        <Icon size={24} className="text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-xs text-muted-foreground">{text}</p>
    </div>
  )
}
function Field({
  label,
  required = false,
  children,
  hint,
}: {
  label: string
  required?: boolean
  children: ReactNode
  hint?: string
}) {
  return (
    <label className="block space-y-2 text-xs">
      <span className="font-medium">
        {label}
        {required && <span className="ms-1 text-red-600">*</span>}
        {!required && (
          <span className="ms-1.5 font-normal text-muted-foreground">
            Optional
          </span>
        )}
      </span>
      {children}
      {hint && (
        <span className="block text-[11px] text-muted-foreground">{hint}</span>
      )}
    </label>
  )
}
function Alert({
  children,
  type = "info",
}: {
  children: ReactNode
  type?: "info" | "warning" | "error" | "success"
}) {
  const Icon =
    type === "success"
      ? CircleCheck
      : type === "info"
        ? ShieldCheck
        : TriangleAlert
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`flex gap-3 rounded-lg border p-3.5 text-xs leading-relaxed ${
        type === "error"
          ? "border-red-200 bg-red-50 text-red-800"
          : type === "warning"
            ? "border-amber-200 bg-amber-50 text-amber-900"
            : type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-blue-100 bg-blue-50/70 text-blue-800"
      }`}
    >
      <Icon size={17} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  )
}
function Progress({
  value,
  color = "blue",
}: {
  value: number
  color?: "blue" | "green" | "amber"
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 overflow-hidden rounded-full bg-slate-100"
    >
      <div
        className={`h-full rounded-full ${
          color === "green"
            ? "bg-emerald-500"
            : color === "amber"
              ? "bg-amber-500"
              : "bg-primary"
        } ${
          value === 100
            ? "w-full"
            : value >= 75
              ? "w-3/4"
              : value >= 65
                ? "w-2/3"
                : value >= 50
                  ? "w-1/2"
                  : value >= 33
                    ? "w-1/3"
                    : value >= 20
                      ? "w-1/4"
                      : "w-[12%]"
        }`}
      />
    </div>
  )
}
function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string
  children: ReactNode
  onClose: () => void
  wide?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const before = document.activeElement as HTMLElement
    ref.current?.focus()
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "Tab") {
        const items = ref.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input, select, textarea, a[href], [tabindex="0"]',
        )
        if (!items?.length) return
        const first = items[0],
          last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", key)
    const old = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", key)
      document.body.style.overflow = old
      before?.focus()
    }
  }, [onClose])
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl ${
          wide ? "sm:max-w-3xl" : "sm:max-w-xl"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-3">
          <h2 className="text-base font-semibold">{title}</h2>
          <IconButton icon={X} label="Close dialog" onClick={onClose} />
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
function exportFile(filename: string, content: string, type = "text/csv") {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
function exportCases(cases: Case[]) {
  exportFile(
    "ejari-transactions.csv",
    [
      "Case ID,Property,Tenant,Landlord,Type,Annual Rent,Broker,Status",
      ...cases.map((item) =>
        [
          item.id,
          item.property,
          item.tenant,
          item.landlord,
          item.type,
          item.rent,
          item.broker,
          item.status,
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n"),
  )
}

function DashboardSettings({
  theme,
  onThemeChange,
  defaultPeriod,
  onDefaultPeriodChange,
  showWeeklyVolume,
  onShowWeeklyVolumeChange,
  onBack,
}: {
  theme: WorkspaceTheme
  onThemeChange: (value: WorkspaceTheme) => void
  defaultPeriod: ChartPeriod
  onDefaultPeriodChange: (value: ChartPeriod) => void
  showWeeklyVolume: boolean
  onShowWeeklyVolumeChange: (value: boolean) => void
  onBack: () => void
}) {
  return (
    <>
      <PageHeader
        title="Dashboard settings"
        subtitle="Choose how your workspace dashboard looks and what it shows."
      >
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft size={15} />
          Back to dashboard
        </Button>
      </PageHeader>

      <div className="max-w-[1040px] divide-y divide-border">
        <section className="py-7">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-foreground">Theme</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Set the color profile for your workspace navigation.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              {
                id: "sky",
                name: "Sky Blue",
                description: "Clear blue highlights and a deep navy frame.",
                sidebar: "#0b1b31",
                header: "#10264a",
                highlight: "#55aaff",
              },
              {
                id: "midnight",
                name: "Midnight Blue",
                description: "A darker indigo-blue frame with cool accents.",
                sidebar: "#10172b",
                header: "#151e3a",
                highlight: "#8ca6ff",
              },
            ] as const).map((option) => {
              const selected = theme === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onThemeChange(option.id)}
                  className={`rounded-lg border p-3 text-start transition-all duration-200 ${
                    selected
                      ? "border-primary bg-secondary/50 ring-1 ring-primary/20"
                      : "border-border bg-white hover:border-[#ca983f]/60 hover:bg-[#fbf7ef]"
                  }`}
                >
                  <div className="mb-3 flex h-[74px] overflow-hidden rounded-md border border-slate-200">
                    <div
                      className="w-[28%]"
                      style={{ backgroundColor: option.sidebar }}
                    />
                    <div className="flex-1 bg-[#f2f5fa] p-2">
                      <div
                        className="mb-2 h-3 rounded-sm"
                        style={{ backgroundColor: option.header }}
                      />
                      <div className="flex gap-1.5">
                        <div className="h-7 flex-1 rounded-sm bg-white" />
                        <div
                          className="h-7 flex-1 rounded-sm"
                          style={{ backgroundColor: `${option.highlight}33` }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center justify-between gap-2">
                    <span>
                      <span className="block text-xs font-semibold text-foreground">
                        {option.name}
                      </span>
                      <span className="mt-1 block text-[10px] text-muted-foreground">
                        {option.description}
                      </span>
                    </span>
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                        selected
                          ? "border-primary bg-primary text-white"
                          : "border-slate-300 bg-white text-transparent"
                      }`}
                    >
                      <Check size={12} />
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="grid gap-6 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(250px,0.8fr)] sm:items-center">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Default chart period
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose which period the weekly case volume chart opens on.
            </p>
          </div>
          <select
            aria-label="Default chart period"
            value={defaultPeriod}
            onChange={(event) =>
              onDefaultPeriodChange(event.target.value as ChartPeriod)
            }
            className="min-h-11 w-full rounded-lg border border-input bg-white px-3 text-xs text-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <option>This week</option>
            <option>Last week</option>
          </select>
        </section>

        <section className="flex items-center justify-between gap-5 py-7">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Weekly case volume
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Show the volume chart on your dashboard.
            </p>
          </div>
          <label className="relative inline-flex shrink-0 cursor-pointer items-center">
            <input
              type="checkbox"
              checked={showWeeklyVolume}
              onChange={(event) =>
                onShowWeeklyVolumeChange(event.target.checked)
              }
              className="peer sr-only"
            />
            <span className="h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2" />
            <span className="absolute start-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5" />
          </label>
        </section>
        <p className="py-4 text-[10px] text-muted-foreground">
          Preferences are saved in this browser.
        </p>
      </div>
    </>
  )
}

function LoginScreen({
    onLogin,
  }: {
    onLogin: (event: FormEvent<HTMLFormElement>) => void
  }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <main className="grid min-h-screen bg-[#f0f4fa] lg:grid-cols-[1.08fr_0.92fr]">
        <section
          className="relative flex min-h-[330px] flex-col justify-between overflow-hidden bg-[#0b1b31] px-7 py-7 text-white sm:px-10 sm:py-9 lg:min-h-screen lg:px-14 lg:py-10 xl:px-20"
          style={{
            backgroundImage: "url('/ejari-sidebar-atmosphere.png')",
            backgroundPosition: "right bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
          }}
        >
          <div className="relative z-10 flex items-center gap-3">
            <img
              src="/ejari-logo.png"
              alt=""
              aria-hidden="true"
              className="h-12 w-12 rounded-xl border border-[#ca983f]/55 bg-white p-0.5 object-contain drop-shadow-[0_8px_16px_rgba(26,57,85,0.25)]"
            />
            <div>
              <p className="text-[19px] font-bold leading-none">
                ejari<span className="text-[#78baff]">.</span>
              </p>
              <p className="mt-1.5 text-[9px] font-semibold tracking-[1.5px] text-[#9cb2d1]">
                WORKSPACE
              </p>
            </div>
          </div>

          <div className="relative z-10 max-w-[520px] py-10 lg:py-16">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#3a5f8d] bg-[#132d4d]/80 px-3 py-1.5 text-[9px] font-semibold tracking-[1.2px] text-[#b7d8ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#69adff] shadow-[0_0_10px_rgba(105,173,255,0.7)]" />
              HORIZON PROPERTIES
            </div>
            <h1 className="text-[38px] font-semibold leading-[1.12] text-white sm:text-[44px]">
              Ejari Workspace
            </h1>
            <p className="mt-4 max-w-[390px] text-[14px] leading-7 text-[#aec0d9]">
              Tenancy operations, documents, and registrations in one secure
              workspace.
            </p>
            <div className="mt-12 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#31557f] bg-[#142c49] text-[#a8d1ff]">
                <ShieldCheck size={19} />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-[#e8f1ff]">
                  Secure agency access
                </p>
                <p className="mt-1 text-[10px] text-[#91a9c8]">
                  Horizon Properties · Dubai, UAE
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-[9px] text-[#829ab8]">
            © 2026 Ejari Workspace
          </p>
        </section>

        <section className="flex min-h-[520px] items-center justify-center px-5 py-10 sm:px-8 lg:min-h-screen lg:px-12">
          <div className="w-full max-w-[410px] rounded-2xl border border-[#dbe4ef] bg-white px-6 py-8 shadow-[0_24px_70px_rgba(19,48,86,0.11)] sm:px-9 sm:py-10">
            <div className="mb-9 flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-[1.5px] text-[#42638c]">
                AGENCY PORTAL
              </span>
              <span className="rounded border border-[#d5e4f7] bg-[#f1f6fd] px-2 py-1 text-[9px] font-semibold tracking-[0.7px] text-[#426caa]">
                DEMO MODE
              </span>
            </div>
            <h2 className="text-[28px] font-semibold text-[#142945]">
              Sign in
            </h2>
            <p className="mt-2 text-[12px] text-[#6c7f99]">
              Access the Horizon Properties workspace.
            </p>

            <form onSubmit={onLogin} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="login-username"
                  className="text-[11px] font-semibold text-[#304966]"
                >
                  Email or username
                </label>
                <div className="relative mt-2">
                  <Mail
                    size={16}
                    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#8295af]"
                  />
                  <input
                    id="login-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="sara@horizon.ae"
                    required
                    className="min-h-12 w-full rounded-lg border border-[#cdd9e8] bg-white ps-10 pe-3 text-[12px] text-[#172d49] placeholder:text-[#9aa9bc] focus:border-[#337fda] focus:ring-2 focus:ring-[#337fda]/15"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="text-[11px] font-semibold text-[#304966]"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <LockKeyhole
                    size={16}
                    className="absolute start-3.5 top-1/2 -translate-y-1/2 text-[#8295af]"
                  />
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="min-h-12 w-full rounded-lg border border-[#cdd9e8] bg-white ps-10 pe-12 text-[12px] text-[#172d49] placeholder:text-[#9aa9bc] focus:border-[#337fda] focus:ring-2 focus:ring-[#337fda]/15"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute end-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md text-[#7186a1] transition-colors hover:bg-[#edf4fc] hover:text-[#1d5eaa]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1765c1] px-4 text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(23,101,193,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1054a5] hover:shadow-[0_12px_24px_rgba(23,101,193,0.28)]"
              >
                Sign in to workspace
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-2 border-t border-[#e8edf4] pt-5 text-[10px] text-[#8190a5]">
              <LockKeyhole size={12} />
              Secure workspace access
            </div>
          </div>
        </section>
      </main>
    )
  }

  function Workspace() {
  const navigate = useNavigate()
  const location = useLocation()
  const page = location.pathname.split("/")[1] || "dashboard"
    const [authenticated, setAuthenticated] = useState(
      () => sessionStorage.getItem("ejari-demo-authenticated") === "true",
    )
    const [theme, setTheme] = useState<WorkspaceTheme>(() =>
      localStorage.getItem("ejari-theme") === "midnight" ? "midnight" : "sky",
    )
    const [defaultPeriod, setDefaultPeriod] = useState<ChartPeriod>(() =>
      localStorage.getItem("ejari-default-period") === "Last week"
        ? "Last week"
        : "This week",
    )
    const [showWeeklyVolume, setShowWeeklyVolume] = useState(
      () => localStorage.getItem("ejari-show-weekly-volume") !== "false",
    )
  const [cases, setCases] = useState<Case[]>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("ejari-cases") || "null") ||
        initialCases
      )
    } catch {
      return initialCases
    }
  })
  const [toast, setToast] = useState("")
  const [documentRecords, setDocumentRecords] =
    useState<Record<string, typeof documentList>>({})
  const [documentCase, setDocumentCase] = useState("")
  const [modal, setModal] = useState("")
  const [search, setSearch] = useState("")
  const [rtl, setRtl] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState(false)
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    localStorage.setItem("ejari-cases", JSON.stringify(cases))
  }, [cases])
  useEffect(() => {
    localStorage.setItem("ejari-theme", theme)
  }, [theme])
  useEffect(() => {
    localStorage.setItem("ejari-default-period", defaultPeriod)
  }, [defaultPeriod])
  useEffect(() => {
    localStorage.setItem("ejari-show-weekly-volume", String(showWeeklyVolume))
  }, [showWeeklyVolume])
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 4500)
      return () => clearTimeout(timer)
    }
  }, [toast])
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        setModal("search")
      }
    }
    const connected = () => setOnline(navigator.onLine)
    window.addEventListener("keydown", listener)
    window.addEventListener("online", connected)
    window.addEventListener("offline", connected)
    return () => {
      window.removeEventListener("keydown", listener)
      window.removeEventListener("online", connected)
      window.removeEventListener("offline", connected)
    }
  }, [])
  const go = (path: string) => {
    navigate(path)
    setMenuOpen(false)
  }
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = String(form.get("username") || "").trim()
    const password = String(form.get("password") || "").trim()
    if (!username || !password) return
    sessionStorage.setItem("ejari-demo-authenticated", "true")
    setAuthenticated(true)
    go("/")
  }
  const signOut = () => {
    sessionStorage.removeItem("ejari-demo-authenticated")
    setAuthenticated(false)
    setProfile(false)
    go("/")
  }
  const currentCase =
    cases.find((item) => item.id === location.pathname.split("/")[2]) ||
    cases[0]
  const updateCase = (status: string) =>
    setCases((items) =>
      items.map((item) =>
        item.id === currentCase.id
          ? { ...item, status, updated: "Just now" }
          : item,
      ),
    )
  const navLabel =
    navItems.find((item) => item.path === location.pathname)?.label ||
    (page === "case"
      ? "Transactions"
      : page === "new"
        ? "Transactions"
        : page === "integration"
          ? "DLD / Ejari"
          : page === "dashboard-settings"
            ? "Dashboard settings"
          : "Workspace")
    if (!authenticated) return <LoginScreen onLogin={handleLogin} />

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="min-h-screen text-[13px]">
      <a
        href="#main"
        className="fixed start-4 top-4 z-[80] -translate-y-24 rounded-lg bg-primary px-5 py-3 text-white focus:translate-y-0"
      >
        Skip to main content
      </a>
      {menuOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 start-0 z-40 flex w-[232px] flex-col border-e border-[#1d3b60] bg-[#0b1b31] text-[#eaf1ff] shadow-[12px_0_36px_rgba(4,14,18,0.18)] transition-transform lg:w-[76px] xl:w-[232px] ${
          menuOpen
            ? "translate-x-0"
            : "-translate-x-full rtl:translate-x-full lg:translate-x-0"
        }`}
        style={{
          backgroundImage: "url('/ejari-sidebar-atmosphere.png')",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundColor: workspaceThemes[theme].sidebar,
          borderColor: workspaceThemes[theme].sidebarBorder,
          boxShadow:
            "inset -1px 0 0 rgba(202,152,63,0.3), 12px 0 36px rgba(4,14,18,0.18)",
        }}
      >
        <button
          onClick={() => go("/")}
          className="group flex h-[76px] shrink-0 items-center gap-2.5 px-6 transition-colors hover:bg-white/[0.035] lg:px-5 xl:px-6"
          aria-label="Ejari operations home"
        >
          <span className="relative grid h-11 w-11 shrink-0 place-items-center transition duration-200 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_8px_12px_rgba(77,157,255,0.38)]">
            <img
              src="/ejari-logo.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full rounded-lg border border-[#ca983f]/55 bg-white p-0.5 object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </span>
          <span className="text-[25px] font-bold tracking-[-0.8px] text-white lg:hidden xl:block">
            ejari<span className="text-[#78baff]">.</span>
          </span>
          <span className="ms-1 rounded border border-white/10 bg-white/[0.045] px-1.5 py-0.5 text-[8px] font-semibold tracking-[0.6px] text-[#a5b8d2] lg:hidden xl:block">
            WORKSPACE
          </span>
        </button>
        <div className="mx-4 mb-5 rounded-lg border border-[#294565] bg-white/[0.025] p-2.5 transition-colors hover:border-[#4774a8] hover:bg-white/[0.045] lg:hidden xl:block">
          <button
            className="flex w-full items-center gap-2.5 text-start"
            onClick={() => setModal("agency")}
          >
            <span className="grid h-8 w-8 place-items-center rounded-md border border-[#31557f] bg-[#1a3354] text-[#a9d1ff]">
              <Building2 size={17} />
            </span>
            <span className="flex-1">
              <span className="block text-[11px] font-semibold text-[#eef4ff]">
                Horizon Properties
              </span>
              <span className="text-[9px] text-[#a4b8d4]">
                Agency workspace
              </span>
            </span>
            <ChevronDown size={13} className="text-[#a4b8d4]" />
          </button>
        </div>
        <div className="px-6 pb-2.5 text-[9px] font-semibold tracking-[1.2px] text-[#8ca6c8] lg:hidden xl:block">
          WORKSPACE
        </div>
        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-1 overflow-y-auto px-3"
        >
          {navItems.map(({ label, path, icon: Icon, count }, index) => {
            const active =
              path === "/"
                ? page === "dashboard"
                : path === "/transactions"
                  ? ["transactions", "new", "case"].includes(page)
                  : location.pathname === path
            return (
              <div key={path}>
                {index === 8 && (
                  <div className="mx-3 my-4 border-t border-[#9a7943]/60" />
                )}
                <button
                  title={label}
                  onClick={() => go(path)}
                  className={`group relative flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-start text-[11px] font-medium transition-all duration-200 ${
                    active
                      ? "text-[#b8d9ff]"
                      : "text-[#b0bfd4] hover:translate-x-0.5 hover:bg-white/[0.075] hover:text-white"
                  }`}
                  style={
                    active
                      ? {
                          backgroundColor: workspaceThemes[theme].active,
                          color: workspaceThemes[theme].activeText,
                          boxShadow: "inset 3px 0 0 #ca983f",
                        }
                      : undefined
                  }
                >
                  <Icon size={17} strokeWidth={1.65} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span className="flex-1 lg:hidden xl:block">
                    {rtl
                      ? ({
                          Dashboard: "لوحة التحكم",
                          Transactions: "المعاملات",
                          Documents: "المستندات",
                          Validation: "التحقق",
                        } as Record<string, string>)[label] || label
                      : label}
                  </span>
                  {count && (
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] lg:hidden xl:block ${
                        active ? "" : "bg-white/[0.07] text-[#a5b8d2]"
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: workspaceThemes[theme].badge,
                              color: workspaceThemes[theme].badgeText,
                            }
                          : undefined
                      }
                    >
                      {count}
                    </span>
                  )}
                </button>
              </div>
            )
          })}
        </nav>
        <div className="mx-4 mb-4 mt-5 rounded-lg border border-[#31557f] bg-[#122b49] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] lg:hidden xl:block">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-[#b4d7ff]">
            <ShieldCheck size={15} />
            DLD gateway connected
          </div>
          <p className="text-[9px] leading-relaxed text-[#a9bfdc]">
            All systems operational.
            <br />
            Last synced just now.
          </p>
          <button
            onClick={() => go("/integration")}
            className="mt-3 flex items-center gap-1 text-[9px] font-semibold text-[#92caff] transition-colors hover:text-white"
          >
            View integration status <ArrowUpRight size={12} />
          </button>
        </div>
        <button
          onClick={() => setModal("help")}
          className="mx-3 mb-3 flex h-11 items-center gap-3 rounded-lg px-3 text-xs text-[#b0bfd4] transition-colors hover:bg-white/[0.075] hover:text-white"
        >
          <CircleHelp size={18} />
          <span className="lg:hidden xl:block">Help & Support</span>
          <SquareArrowOutUpRight
            size={12}
            className="ms-auto lg:hidden xl:block"
          />
        </button>
        <button
          title="Dashboard settings"
          aria-label="Dashboard settings"
          onClick={() => go("/dashboard-settings")}
          className="group flex items-center gap-3 border-t border-[#9a7943]/65 px-5 py-4 text-start text-[#b8c9e0] transition-colors hover:bg-white/[0.055] hover:text-white"
          style={{ borderColor: "rgba(202,152,63,0.5)" }}
        >
          <Settings
            size={19}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
          <span className="min-w-0 flex-1 text-[11px] font-semibold lg:hidden xl:block">
            Dashboard settings
          </span>
          <ChevronRight size={13} className="lg:hidden xl:block" />
        </button>
      </aside>
      <div className="lg:ms-[76px] xl:ms-[232px]">
        <header
          className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-3 border-b border-[#244367] bg-[#10264a] px-4 text-[#eaf1ff] shadow-[0_8px_28px_rgba(4,14,18,0.2)] md:px-7"
          style={{
            backgroundImage: "url('/ejari-header-atmosphere.png')",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
            backgroundColor: workspaceThemes[theme].header,
            borderColor: "rgba(202,152,63,0.55)",
          }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="lg:hidden">
              <IconButton
                icon={Menu}
                label="Open navigation"
                onClick={() => setMenuOpen(true)}
              />
            </div>
            <div className="hidden items-center gap-2 text-[11px] text-[#b0bfd4] md:flex">
              <House size={14} />
              <ChevronRight size={12} />
              <span className="font-medium text-[#f2f6ff]">{navLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => setModal("search")}
              className="flex min-h-11 items-center gap-2 rounded-lg border border-[#8c7144]/70 bg-[#172f50] px-3 text-[11px] text-[#bacbe2] transition-all duration-200 hover:border-[#d2a548] hover:bg-[#1d3d66] hover:text-white md:w-[255px]"
            >
              <Search size={15} />
              <span className="hidden sm:block">Search anything...</span>
              <kbd className="ms-auto hidden rounded border border-[#8c7144]/65 bg-[#112847] px-1.5 py-0.5 text-[9px] text-[#bacbe2] md:block">
                ⌘ K
              </kbd>
            </button>
            <span className="hidden items-center gap-1.5 text-[10px] text-[#bacbe2] min-[68.75rem]:flex">
              {online ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#65aaff]" />
                  Connected
                </>
              ) : (
                <>
                  <WifiOff size={12} />
                  Offline
                </>
              )}
            </span>
            <span className="hidden h-5 w-px bg-[#b38b48]/70 md:block" />
            <button
              onClick={() => go("/notifications")}
              aria-label="Notifications, 6 unread"
              className="relative grid h-11 w-11 place-items-center rounded-lg text-[#a5b5b4] transition-all duration-200 hover:bg-white/[0.07] hover:text-[#e6c276]"
            >
              <Bell size={18} />
              <span className="absolute end-2 top-1.5 h-1.5 w-1.5 rounded-full bg-[#f07972] ring-2 ring-[#10264a]" />
            </button>
            <button
              onClick={() => setProfile(!profile)}
              aria-label="Open profile menu"
              className="flex min-h-11 min-w-11 items-center gap-2 rounded-lg px-1.5 transition-colors hover:bg-white/[0.055]"
            >
              <Avatar name="Sara Al Hashimi" small />
              <span className="hidden text-start min-[87.5rem]:block"><span className="block text-[10px] font-semibold">Sara Al Hashimi</span><span className="block text-[9px] text-muted-foreground">Agency Admin</span></span>
              <ChevronDown size={12} className="text-[#bacbe2]" />
            </button>
          </div>
        </header>
        {profile && (
          <div className="fixed end-5 top-[65px] z-40 w-60 rounded-xl border border-[#2d4a70] bg-[#0e2340] p-2 text-[#edf4ff] shadow-xl">
            <div className="border-b border-[#2d4a70] px-3 py-3">
              <p className="font-semibold">Sara Al Hashimi</p>
              <p className="mt-1 text-xs text-[#a5b9d5]">
                Agency Admin · Horizon Properties
              </p>
            </div>
            <button
              className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-xs text-[#ccdaf0] transition-colors hover:bg-white/[0.08] hover:text-white"
              onClick={() => {
                setRtl(!rtl)
                setProfile(false)
              }}
            >
              <Globe2 size={16} />
              {rtl ? "English · Left to right" : "العربية · Right to left"}
            </button>
            <button
              className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-xs text-[#ccdaf0] transition-colors hover:bg-white/[0.08] hover:text-white"
              onClick={() => {
                go("/administration")
                setProfile(false)
              }}
            >
              <Settings2 size={16} />
              Profile & settings
            </button>
            <button
              className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-xs text-[#ccdaf0] transition-colors hover:bg-white/[0.08] hover:text-white"
              onClick={() => {
                go("/intake/demo-secure-token")
                setProfile(false)
              }}
            >
              <Smartphone size={16} />
              Preview client intake portal
            </button>
            <button
              className="mt-1 flex min-h-11 w-full items-center gap-2 rounded-lg border-t border-[#2d4a70] px-3 pt-1 text-xs text-[#ffb8bc] transition-colors hover:bg-[#7f303a]/25 hover:text-white"
              onClick={signOut}
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        )}
        {!online && (
          <div className="bg-amber-50 px-7 py-3 text-xs text-amber-900">
            <WifiOff size={14} className="me-2 inline" />
            You’re offline. Saved case data is available; submissions are
            paused.
          </div>
        )}
        <main
          id="main"
          className="mx-auto max-w-[1920px] p-4 pb-10 md:p-7 md:pb-10"
        >
          {page === "dashboard" && (
            <Dashboard
              cases={cases}
              go={go}
              rtl={rtl}
              period={defaultPeriod}
              onPeriodChange={setDefaultPeriod}
              showWeeklyVolume={showWeeklyVolume}
            />
          )}
          {page === "dashboard-settings" && (
            <DashboardSettings
              theme={theme}
              onThemeChange={setTheme}
              defaultPeriod={defaultPeriod}
              onDefaultPeriodChange={setDefaultPeriod}
              showWeeklyVolume={showWeeklyVolume}
              onShowWeeklyVolumeChange={setShowWeeklyVolume}
              onBack={() => go("/")}
            />
          )}
          {page === "transactions" && (
            <Transactions cases={cases} go={go} notify={setToast} />
          )}
          {page === "new" && (
            <NewTransaction
              onCreate={(item) => {
                setCases((items) => [item, ...items])
                go(`/case/${item.id}`)
                setToast(
                  "Transaction created. Your case is ready for client intake.",
                )
              }}
              onDraft={(item) => {
                setCases((items) => [item, ...items])
                go("/transactions")
                setToast("Draft saved successfully.")
              }}
              onBack={() => go("/transactions")}
              rtl={rtl}
            />
          )}
          {page === "case" && (
            <CaseDetail
              item={currentCase}
              documents={documentRecords[currentCase.id] || documentList}
              go={(path) => {
                if (path === "/documents" || path === "/validation")
                  setDocumentCase(currentCase.id)
                go(path)
              }}
              onIntake={() => setModal("intake")}
              notify={setToast}
              onPush={() => setModal("push")}
              update={updateCase}
              rtl={rtl}
            />
          )}
          {["documents", "validation"].includes(page) && (
            <DocumentWorkspace
              item={
                cases.find((item) => item.id === documentCase) || currentCase
              }
              docs={
                documentRecords[documentCase || currentCase.id] || documentList
              }
              onChange={(docs) =>
                setDocumentRecords((records) => ({
                  ...records,
                  [documentCase || currentCase.id]: docs,
                }))
              }
              notify={setToast}
            />
          )}
          {page === "intake-links" && (
            <IntakeLinks
              cases={cases}
              send={() => setModal("intake")}
              notify={setToast}
              go={go}
            />
          )}
          {page === "contracts" && (
            <Contracts cases={cases} notify={setToast} />
          )}
          {page === "payments" && <Payments notify={setToast} />}
          {page === "integration" && (
            <Integration cases={cases} notify={setToast} />
          )}
          {page === "notifications" && <Notifications />}
          {page === "reports" && <Reports cases={cases} />}
          {page === "audit" && <Audit />}
          {page === "states" && <InterfaceStates />}
          {page === "administration" && <Administration notify={setToast} />}
          {![
            "dashboard",
            "dashboard-settings",
            "transactions",
            "new",
            "case",
            "documents",
            "validation",
            "intake-links",
            "contracts",
            "payments",
            "integration",
            "notifications",
            "reports",
            "audit",
            "administration",
            "states",
          ].includes(page) && (
            <Empty
              title="Page not found"
              text="Use the workspace navigation to return to your cases."
            />
          )}
        </main>
        <footer className="mx-7 flex flex-wrap justify-between gap-2 border-t border-border py-4 text-[9px] text-muted-foreground">
          <span>© 2026 Ejari Workspace · Horizon Properties</span>
          <span className="flex items-center gap-1.5">
            <LockKeyhole size={11} />
            Secure workspace<span className="mx-2">·</span>All times in Gulf
            Standard Time (UTC+4)
          </span>
        </footer>
      </div>
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 end-6 z-[60] flex max-w-[calc(100%-48px)] items-center gap-3 rounded-xl border border-emerald-200 bg-white px-5 py-4 text-xs shadow-xl"
        >
          <CircleCheck size={19} className="shrink-0 text-emerald-600" />
          {toast}
          <button
            onClick={() => setToast("")}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      )}
      {modal === "search" && (
        <Modal title="Search your workspace" onClose={() => setModal("")} wide>
          <div className="relative">
            <Search
              size={18}
              className="absolute start-3 top-3 text-muted-foreground"
            />
            <input
              autoFocus
              className={`${fieldClass} ps-10`}
              placeholder="Case ID, name, mobile, email, unit, DEWA, Ejari or title deed…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <p className="my-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {search ? "Search results" : "Recent transactions"}
          </p>
          {cases
            .filter(
              (item) =>
                !search ||
                Object.values(item)
                  .join(" ")
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                [
                  item.id === "EJR-2026-004531" ? "+971501112234" : "",
                  item.id === "EJR-2026-004531"
                    ? "muhammad.ahmed@example.com"
                    : "",
                  item.id === "EJR-2026-004528" ? "EJ-2026-089214" : "",
                  item.id === "EJR-2026-004531" ? "DEWA-1280456" : "",
                  item.id === "EJR-2026-004531" ? "TD-2024-87651" : "",
                ].some((value) =>
                  value
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .includes(search.toLowerCase().replace(/\s/g, "")),
                ),
            )
            .slice(0, 5)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  go(`/case/${item.id}`)
                  setModal("")
                }}
                className="flex min-h-16 w-full items-center gap-3 rounded-lg px-3 text-start hover:bg-slate-50"
              >
                <FileText size={18} className="text-primary" />
                <span className="flex-1">
                  <span className="block text-xs font-medium">
                    {item.property}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.id} · {item.tenant}
                  </span>
                </span>
                <Badge status={item.status} />
                <ChevronRight size={16} />
              </button>
            ))}
        </Modal>
      )}
      {modal === "intake" && (
        <SendIntake
          item={currentCase}
          onClose={() => setModal("")}
          notify={setToast}
        />
      )}
      {modal === "push" && (
        <Modal title="Submit verified case to DLD" onClose={() => setModal("")}>
          {currentCase.status === "Ready to Push" ? (
            <>
              <Alert>
                <strong>Verified case ready for submission.</strong>
                <br />
                {currentCase.id} · {currentCase.property}
                <br />
                Queue a sandbox demonstration. Registration will not be shown as
                successful without gateway confirmation.
              </Alert>
              <div className="mt-5 flex justify-end gap-2">
                <Button onClick={() => setModal("")}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    updateCase("Push Queued")
                    setModal("push-progress")
                  }}
                >
                  <Send size={14} />
                  Confirm & queue
                </Button>
              </div>
            </>
          ) : (
            <>
              <Alert type="warning">
                <strong>Submission is currently blocked.</strong>
                <br />
                Emirates ID requires rework and a signed contract is missing.
                Resolve all hard blocks before queuing this case. A case is only
                registered after a confirmed gateway response.
              </Alert>
              <div className="mt-5 flex justify-end gap-2">
                <Button onClick={() => setModal("")}>Close</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setModal("")
                    go("/validation")
                  }}
                >
                  Review validation <ArrowRight size={14} />
                </Button>
              </div>
            </>
          )}
        </Modal>
      )}
      {modal === "push-progress" && (
        <PushDemo onClose={() => setModal("")} onStatus={updateCase} />
      )}
      {modal === "help" && (
        <Modal title="Help & Support" onClose={() => setModal("")}>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            Get support for intake, document validation, and DLD gateway issues.
            Include your case ID and correlation ID for faster assistance.
          </p>
          <div className="rounded-lg border border-border p-4">
            <p className="font-medium">Agency operations support</p>
            <a
              className="mt-3 flex items-center gap-2 text-xs text-primary"
              href="mailto:support@horizon.example"
            >
              <Mail size={16} />
              support@horizon.example
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Monday–Friday · 09:00–18:00 GST
            </p>
          </div>
        </Modal>
      )}
      {modal === "agency" && (
        <Modal title="Agency workspace" onClose={() => setModal("")}>
          <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <Building2 size={25} className="text-primary" />
            <div className="flex-1">
              <p className="font-semibold">Horizon Properties</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Dubai · RERA ORN 28476
              </p>
            </div>
            <CircleCheck size={20} className="text-primary" />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            You have access to one agency workspace.
          </p>
        </Modal>
      )}
    </div>
  )
}
function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[#e3e8ed] bg-[#eef0e9] font-semibold text-[#61705a] ${
        small ? "h-8 w-8 text-[9px]" : "h-9 w-9 text-[10px]"
      }`}
    >
      {name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")}
    </span>
  )
}

const weekly = [
  { day: "Mon", current: 19, previous: 14 },
  { day: "Tue", current: 26, previous: 20 },
  { day: "Wed", current: 22, previous: 18 },
  { day: "Thu", current: 34, previous: 24 },
  { day: "Fri", current: 28, previous: 21 },
  { day: "Sat", current: 39, previous: 29 },
  { day: "Sun", current: 35, previous: 26 },
]
function VolumeChart({ reports = false }: { reports?: boolean }) {
  return (
    <div className={reports ? "h-[260px] px-4" : "h-[164px] px-2"} dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={weekly}
          margin={{ top: 10, right: 16, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2959d8" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#2959d8" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 4"
            stroke="#e8edf3"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 9, fill: "#667387" }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />
          <YAxis
            tick={{ fontSize: 9, fill: "#667387" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 10, 20, 30, 40]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5eaf0",
              fontSize: 11,
            }}
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="previous"
            name="Previous week"
            stroke="#b4c3d7"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            fill="transparent"
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="current"
            name="This week"
            stroke="#2959d8"
            strokeWidth={2.2}
            fill="url(#volumeFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
function Dashboard({
  cases,
  go,
  rtl,
  period,
  onPeriodChange,
  showWeeklyVolume,
}: {
  cases: Case[]
  go: (path: string) => void
  rtl: boolean
  period: ChartPeriod
  onPeriodChange: (period: ChartPeriod) => void
  showWeeklyVolume: boolean
}) {
  const kpis = [
    {
      label: "Active Transactions",
      value: "128",
      icon: FolderOpen,
      color: "text-primary bg-blue-50",
      change: "+12.3%",
      desc: "vs. last month",
      good: true,
    },
    {
      label: "Awaiting Documents",
      value: "36",
      icon: FileClock,
      color: "text-amber-600 bg-amber-50",
      change: "8",
      desc: "need a follow-up",
    },
    {
      label: "In Validation",
      value: "24",
      icon: ShieldCheck,
      color: "text-violet-600 bg-violet-50",
      change: "6",
      desc: "require your review",
    },
    {
      label: "Ready to Push",
      value: "18",
      icon: Send,
      color: "text-emerald-600 bg-emerald-50",
      change: "All clear",
      desc: "for DLD submission",
    },
    {
      label: "DLD Registration Issues",
      value: "3",
      icon: ShieldAlert,
      color: "text-red-600 bg-red-50",
      change: "2",
      desc: "retries available",
    },
    {
      label: "Expiring Intake Links",
      value: "7",
      icon: Link2,
      color: "text-orange-600 bg-orange-50",
      change: "Within",
      desc: "the next 24 hours",
    },
  ]
  const pipeline = [
    { label: "Draft", count: 12, icon: FilePenLine, color: "bg-slate-300" },
    { label: "Intake", count: 36, icon: Link2, color: "bg-blue-400" },
    {
      label: "Validation",
      count: 24,
      icon: ShieldCheck,
      color: "bg-violet-400",
    },
    { label: "Ready to push", count: 18, icon: Send, color: "bg-teal-400" },
    {
      label: "Awaiting signature",
      count: 16,
      icon: FilePenLine,
      color: "bg-amber-400",
    },
    {
      label: "Push in progress",
      count: 8,
      icon: RefreshCw,
      color: "bg-sky-400",
    },
    {
      label: "Registered",
      count: 14,
      icon: CircleCheck,
      color: "bg-emerald-500",
    },
  ]
  return (
    <>
      <PageHeader
        title={rtl ? "صباح الخير، سارة" : "Good morning, Sara"}
        subtitle={
          rtl
            ? "إليك ما يحتاج إلى اهتمامك اليوم."
            : "Here’s what needs your attention today."
        }
      >
        <span className="me-2 hidden items-center gap-2 text-[11px] text-muted-foreground min-[87.5rem]:flex">
          <CalendarDays size={14} />
          Monday, 12 October 2026
        </span>
        <Button onClick={() => exportCases(cases)}>
          <ArrowDownToLine size={14} />
          Export
        </Button>
        <Button variant="primary" onClick={() => go("/new")}>
          <Plus size={16} />
          New Transaction
        </Button>
      </PageHeader>
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 min-[86.25rem]:grid-cols-6">
        {kpis.map((item, index) => (
          <button
            key={item.label}
            onClick={() =>
              go(
                index === 4
                  ? "/integration"
                  : index === 5
                    ? "/intake-links"
                    : index === 2
                      ? "/validation"
                      : "/transactions",
              )
            }
            className="min-w-0 rounded-xl border border-border bg-white p-4 text-start shadow-[0_2px_4px_0_rgba(20,35,60,0.015)] transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-medium text-muted-foreground">
                {item.label}
              </span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${item.color}`}
              >
                <item.icon size={14} strokeWidth={1.7} />
              </span>
            </div>
            <p className="mt-3 text-[28px] font-semibold leading-none tracking-[-0.5px]">
              {item.value}
            </p>
            <p className="mt-3 whitespace-nowrap text-[8px] text-slate-500">
              <span
                className={
                  item.good
                    ? "me-1 font-medium text-emerald-700"
                    : index === 4
                      ? "me-1 font-medium text-red-600"
                      : "me-1 font-medium text-slate-600"
                }
              >
                {item.good && (
                  <TrendingUp size={10} className="me-0.5 inline" />
                )}
                {item.change}
              </span>
              {item.desc}
            </p>
          </button>
        ))}
      </div>
      <Card className="mb-5">
        <CardHeader
          title="Transaction pipeline"
          subtitle="A live overview of your active tenancy cases"
        >
          <button
            onClick={() => go("/transactions")}
            className="flex min-h-8 items-center gap-1.5 text-[10px] font-medium text-primary"
          >
            View all transactions <ArrowRight size={13} />
          </button>
        </CardHeader>
        <div
          className="mx-5 mb-5 flex h-2.5 gap-1 overflow-hidden rounded-full"
          aria-label="Pipeline status distribution"
        >
          {pipeline.map((item) => (
            <div
              key={item.label}
              className={`flex-1 ${item.color} ${
                item.count > 25 ? "grow-[3]" : item.count > 15 ? "grow-[2]" : ""
              }`}
              title={`${item.label}: ${item.count}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-y-4 px-5 pb-5 sm:grid-cols-4 min-[75rem]:grid-cols-7">
          {pipeline.map((item, index) => (
            <button
              key={item.label}
              onClick={() =>
                go(
                  `/transactions?status=${encodeURIComponent(index === 3 ? "Ready to Push" : index === 4 ? "Awaiting Signature" : item.label)}`,
                )
              }
              className={`flex items-start gap-2.5 text-start ${
                index
                  ? "min-[75rem]:border-s min-[75rem]:border-border min-[75rem]:ps-4"
                  : ""
              }`}
            >
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${item.color}`}
              />
              <span>
                <span className="block text-[10px] text-muted-foreground">
                  {item.label}
                </span>
                <span className="mt-1 block text-[19px] font-semibold">
                  {item.count}
                </span>
              </span>
            </button>
          ))}
        </div>
      </Card>
      <div
        className={`mb-5 grid gap-5 ${showWeeklyVolume ? "min-[75rem]:grid-cols-[1.38fr_1fr]" : ""}`}
      >
        <Card>
          <CardHeader title="Requires your attention">
            <span className="rounded-md bg-amber-50 px-2 py-1 text-[9px] font-semibold text-amber-800">
              14 cases
            </span>
          </CardHeader>
          <div className="px-5 pb-2">
            {[
              {
                title: "Emirates ID needs to be re-uploaded",
                id: "EJR-2026-004531",
                subtitle: "Muhammad Ahmed · Marina Heights",
                icon: FileSearch,
                color: "bg-amber-50 text-amber-600",
                time: "12 min ago",
                status: "Action Needed",
              },
              {
                title: "DLD submission failed",
                id: "EJR-2026-004525",
                subtitle: "Ali Hassan · Belgravia III",
                icon: ShieldAlert,
                color: "bg-red-50 text-red-500",
                time: "1 hour ago",
                status: "Push Failed",
              },
              {
                title: "Intake link expires in 4 hours",
                id: "EJR-2026-004529",
                subtitle: "James Wilson · Arabian Ranches",
                icon: Link2,
                color: "bg-orange-50 text-orange-600",
                time: "2 hours ago",
                status: "Expiring",
              },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => go(`/case/${item.id}`)}
                className={`flex w-full items-start gap-3 py-3.5 text-start ${
                  index ? "border-t border-border" : "pt-1"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${item.color}`}
                >
                  <item.icon size={16} strokeWidth={1.7} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold">
                    {item.title}
                  </span>
                  <span className="mt-1 block truncate text-[9px] text-muted-foreground">
                    <span className="text-slate-500">{item.id}</span> ·{" "}
                    {item.subtitle}
                  </span>
                </span>
                <span className="hidden shrink-0 text-end sm:block">
                  <Badge status={item.status} />
                  <span className="mt-1 block text-[8px] text-muted-foreground">
                    {item.time}
                  </span>
                </span>
                <ChevronRight
                  size={14}
                  className="mt-2 shrink-0 text-muted-foreground"
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => go("/validation")}
            className="flex w-full items-center justify-center gap-2 border-t border-border py-3.5 text-[10px] font-medium text-primary"
          >
            View all cases requiring attention <ArrowRight size={12} />
          </button>
        </Card>
        {showWeeklyVolume && (
          <Card>
            <CardHeader title="Weekly case volume">
              <select
                aria-label="Chart period"
                value={period}
                onChange={(event) =>
                  onPeriodChange(event.target.value as ChartPeriod)
                }
                className="rounded-md border border-border bg-white px-2 py-1.5 text-[9px] text-muted-foreground"
              >
                <option>This week</option>
                <option>Last week</option>
              </select>
            </CardHeader>
            <div className="flex items-baseline gap-3 px-5 pb-2">
              <span className="text-[26px] font-semibold">
                {period === "This week" ? "203" : "152"}
              </span>
              <span className="text-[9px] text-muted-foreground">
                transactions
              </span>
              <span className="flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-1 text-[8px] font-medium text-emerald-700">
                <TrendingUp size={10} />
                +18.2%
              </span>
            </div>
            <VolumeChart />
            <div className="flex justify-center gap-5 pb-4 pt-3 text-[9px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                This week
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                Previous week
              </span>
            </div>
          </Card>
        )}
      </div>
      <Card className="mb-5">
        <CardHeader
          title="Recent transactions"
          subtitle="Your latest tenancy cases and their current status"
        >
          <button
            onClick={() => go("/transactions")}
            className="flex min-h-8 items-center gap-1.5 text-[10px] font-medium text-primary"
          >
            View all <ArrowRight size={13} />
          </button>
        </CardHeader>
        <CaseTable cases={cases.slice(0, 5)} go={go} compact />
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[9px] text-muted-foreground">
          <span>Showing 5 of 128 transactions</span>
          <span className="flex items-center gap-1.5">
            <RefreshCw size={11} />
            Updated just now
          </span>
        </div>
      </Card>
      <div className="grid gap-5 md:grid-cols-2 min-[87.5rem]:grid-cols-[1fr_1fr_1.08fr]">
        <Card>
          <CardHeader
            title="Intake completion"
            subtitle="36 cases awaiting client documents"
          >
            <Link2 size={15} className="text-muted-foreground" />
          </CardHeader>
          <div className="space-y-5 px-5 pb-5">
            {[
              { name: "Tenant documents", count: "24 / 36", value: 67 },
              { name: "Landlord documents", count: "18 / 36", value: 50 },
            ].map((item) => (
              <div key={item.name}>
                <div className="mb-2.5 flex justify-between text-[10px]">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{item.count} completed</span>
                </div>
                <Progress value={item.value} />
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-md bg-amber-50 px-3 py-2 text-[9px] text-amber-800">
              <Clock3 size={12} />8 clients haven’t started their intake
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader
            title="Document validation"
            subtitle="Across all active transactions"
          >
            <ShieldCheck size={15} className="text-muted-foreground" />
          </CardHeader>
          <div className="grid grid-cols-3 gap-2 px-5 pb-4 text-center">
            {[
              { value: 186, status: "Accepted" },
              { value: 24, status: "Pending" },
              { value: 9, status: "Rejected" },
            ].map((item) => (
              <div
                key={item.status}
                className="rounded-lg border border-border py-3"
              >
                <p className="mb-2 text-xl font-semibold">{item.value}</p>
                <Badge status={item.status} compact />
              </div>
            ))}
          </div>
          <div className="mx-5 mb-4 flex items-center justify-between rounded-md bg-slate-50 p-3 text-[9px]">
            <span className="text-muted-foreground">
              Average validation time
            </span>
            <span className="font-semibold">
              4.2 hours <span className="ms-1 text-emerald-600">↓ 12%</span>
            </span>
          </div>
        </Card>
        <Card>
          <CardHeader
            title="DLD integration"
            subtitle="Gateway health & registration activity"
          >
            <span className="flex items-center gap-1.5 text-[9px] text-emerald-700">
              <CircleCheck size={12} />
              Operational
            </span>
          </CardHeader>
          <div className="flex items-center justify-between px-5 pb-3">
            <div>
              <p className="text-[25px] font-semibold">
                98.6<span className="text-base">%</span>
              </p>
              <p className="mt-1 text-[9px] text-muted-foreground">
                Registration success rate
              </p>
            </div>
            <div
              className="flex h-10 items-end gap-1"
              aria-label="Registration success trend: stable, over 98 percent"
            >
              {[
                "h-5",
                "h-6",
                "h-5",
                "h-7",
                "h-6",
                "h-8",
                "h-7",
                "h-8",
                "h-9",
                "h-8",
                "h-9",
                "h-10",
              ].map((height, index) => (
                <div
                  key={index}
                  className={`w-2 rounded-t-sm bg-emerald-200 ${height} ${
                    index > 8 ? "bg-emerald-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="mx-5 flex justify-between border-t border-border py-3 text-[9px]">
            <span className="text-muted-foreground">
              8 queued <span className="mx-2">·</span>3 need attention
            </span>
            <button
              onClick={() => go("/integration")}
              className="font-medium text-primary"
            >
              View gateway <ArrowUpRight size={11} className="inline" />
            </button>
          </div>
        </Card>
      </div>
      <Card className="mt-5">
        <CardHeader title="Recent activity">
          <button
            onClick={() => go("/audit")}
            className="text-[10px] font-medium text-primary"
          >
            View audit trail <ArrowRight size={12} className="ms-1 inline" />
          </button>
        </CardHeader>
        <div className="grid gap-4 px-5 pb-5 sm:grid-cols-3">
          {[
            {
              title: "Ejari registration confirmed",
              desc: "EJR-2026-004528 · DLD Gateway",
              time: "10:42 AM",
              icon: CircleCheck,
            },
            {
              title: "Passport accepted",
              desc: "EJR-2026-004531 · Mariam Saeed",
              time: "10:38 AM",
              icon: FileCheck2,
            },
            {
              title: "Tenant intake submitted",
              desc: "EJR-2026-004530 · Priya Sharma",
              time: "10:26 AM",
              icon: Upload,
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="rounded-full bg-slate-50 p-2 text-slate-500">
                <item.icon size={14} />
              </span>
              <div>
                <p className="text-[10px] font-medium">{item.title}</p>
                <p className="mt-1 text-[9px] text-muted-foreground">
                  {item.desc}
                </p>
                <p className="mt-1 text-[8px] text-muted-foreground">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}

function CaseTable({
  cases,
  go,
  compact = false,
  selected = [],
  onSelect,
  sort,
  onSort,
}: {
  cases: Case[]
  go: (path: string) => void
  compact?: boolean
  selected?: string[]
  onSelect?: (id: string) => void
  sort?: boolean
  onSort?: () => void
}) {
  const [menu, setMenu] = useState<string | null>(null)
  return (
    <>
      <div className="relative hidden overflow-x-auto lg:block">
        <table className="w-full text-start text-[10px]">
          <thead className="border-y border-border bg-[#fafbfd] text-[9px] font-medium text-muted-foreground">
            <tr>
              {!compact && (
                <th className="w-9 px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Select all transactions"
                    checked={
                      cases.length > 0 &&
                      cases.every((item) => selected.includes(item.id))
                    }
                    onChange={() => onSelect?.("all")}
                    className="h-3.5 w-3.5 accent-primary"
                  />
                </th>
              )}
              <th className="px-5 py-3 text-start font-medium">
                <button onClick={onSort} className="flex items-center gap-1.5">
                  Case ID{" "}
                  {onSort && (
                    <ArrowDown size={11} className={sort ? "rotate-180" : ""} />
                  )}
                </button>
              </th>
              <th className="px-3 py-3 text-start font-medium">Property</th>
              <th className="px-3 py-3 text-start font-medium">Tenant</th>
              {!compact && (
                <th className="px-3 py-3 text-start font-medium">Landlord</th>
              )}
              <th className="px-3 py-3 text-start font-medium">Type</th>
              <th className="px-3 py-3 text-start font-medium">Annual rent</th>
              {!compact && (
                <th className="px-3 py-3 text-start font-medium">Broker</th>
              )}
              <th className="px-3 py-3 text-start font-medium">Status</th>
              <th className="px-3 py-3 text-start font-medium">Updated</th>
              <th className="w-10 px-2 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {cases.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border last:border-0 hover:bg-slate-50/70"
              >
                {!compact && (
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      aria-label={`Select ${item.id}`}
                      checked={selected.includes(item.id)}
                      onChange={() => onSelect?.(item.id)}
                      className="h-3.5 w-3.5 accent-primary"
                    />
                  </td>
                )}
                <td className="whitespace-nowrap px-5 py-4">
                  <button
                    onClick={() => go(`/case/${item.id}`)}
                    className="text-[9px] font-medium text-primary hover:underline"
                  >
                    {item.id}
                  </button>
                </td>
                <td className="min-w-[170px] px-3 py-3">
                  <button
                    className="text-start"
                    onClick={() => go(`/case/${item.id}`)}
                  >
                    <span className="block text-[10px] font-medium">
                      {item.property}
                    </span>
                    <span className="mt-1 block text-[9px] text-muted-foreground">
                      {item.area}
                    </span>
                  </button>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[10px]">
                  {item.tenant}
                </td>
                {!compact && (
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.landlord}
                  </td>
                )}
                <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                  {item.type}
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-medium tabular-nums">
                  {money(item.rent)}
                </td>
                {!compact && (
                  <td className="whitespace-nowrap px-3 py-3">{item.broker}</td>
                )}
                <td className="px-3 py-3">
                  <Badge status={item.status} />
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-[9px] text-muted-foreground">
                  {item.updated}
                </td>
                <td className="relative px-1">
                  <IconButton
                    icon={Ellipsis}
                    label={`Actions for ${item.id}`}
                    onClick={() => setMenu(menu === item.id ? null : item.id)}
                  />
                  {menu === item.id && (
                    <div className="absolute end-5 top-10 z-10 w-36 rounded-lg border border-border bg-white p-1 shadow-lg">
                      <button
                        className="min-h-10 w-full rounded px-3 text-start text-xs hover:bg-slate-50"
                        onClick={() => {
                          setMenu(null)
                          go(`/case/${item.id}`)
                        }}
                      >
                        Open case
                      </button>
                      <button
                        className="min-h-10 w-full rounded px-3 text-start text-xs hover:bg-slate-50"
                        onClick={() => {
                          exportCases([item])
                          setMenu(null)
                        }}
                      >
                        Export case
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-border lg:hidden">
        {cases.map((item) => (
          <button
            onClick={() => go(`/case/${item.id}`)}
            key={item.id}
            className="block w-full space-y-2 p-4 text-start"
          >
            <div className="flex justify-between">
              <span className="text-[10px] font-medium text-primary">
                {item.id}
              </span>
              <Badge status={item.status} />
            </div>
            <p className="text-xs font-semibold">{item.property}</p>
            <p className="text-[11px] text-muted-foreground">
              {item.tenant} · {item.area}
            </p>
            <div className="flex justify-between text-[10px]">
              <span className="font-medium">{money(item.rent)}</span>
              <span className="text-muted-foreground">{item.updated}</span>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
function Transactions({
  cases,
  go,
  notify,
}: {
  cases: Case[]
  go: (path: string) => void
  notify: (text: string) => void
}) {
  const location = useLocation()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState(
    new URLSearchParams(location.search).get("status") || "All statuses",
  )
  const [type, setType] = useState("All types")
  const [filters, setFilters] = useState(false)
  const [sort, setSort] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [current, setCurrent] = useState(1)
  const [broker, setBroker] = useState("All brokers")
  const [propertyType, setPropertyType] = useState("All properties")
  const [documentStatus, setDocumentStatus] = useState("All documents")
  const [dldStatus, setDldStatus] = useState("All gateway statuses")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const filtered = cases
    .filter(
      (item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (status === "All statuses" ||
          item.status.toLowerCase() === status.toLowerCase()) &&
        (type === "All types" || item.type === type) &&
        (broker === "All brokers" || item.broker === broker) &&
        (propertyType === "All properties" ||
          (item.property.startsWith("Villa") ? "Villa" : "Apartment") ===
            propertyType) &&
        (documentStatus === "All documents" ||
          (documentStatus === "Accepted"
            ? ["Registered", "Ready to Push"].includes(item.status)
            : ["Validation", "Rework"].includes(item.status))) &&
        (dldStatus === "All gateway statuses" ||
          (dldStatus === "Failed"
            ? item.status === "Push Failed"
            : dldStatus === "Registered"
              ? item.status === "Registered"
              : item.status === "Push Queued")) &&
        (!dateFrom ||
          (item.updated === "Yesterday" ? "2026-10-11" : "2026-10-12") >=
            dateFrom) &&
        (!dateTo ||
          (item.updated === "Yesterday" ? "2026-10-11" : "2026-10-12") <=
            dateTo),
    )
    .sort((first, second) =>
      sort
        ? first.id.localeCompare(second.id)
        : second.id.localeCompare(first.id),
    )
  const shown = filtered.slice((current - 1) * 6, current * 6)
  const select = (id: string) =>
    setSelected((values) =>
      id === "all"
        ? shown.every((item) => values.includes(item.id))
          ? []
          : shown.map((item) => item.id)
        : values.includes(id)
          ? values.filter((value) => value !== id)
          : [...values, id],
    )
  return (
    <>
      <PageHeader
        title="Transactions"
        subtitle="Manage tenancy cases from intake to Ejari registration."
      >
        <Button
          onClick={() =>
            exportCases(
              selected.length
                ? cases.filter((item) => selected.includes(item.id))
                : filtered,
            )
          }
        >
          <Download size={15} />
          Export
        </Button>
        <Button variant="primary" onClick={() => go("/new")}>
          <Plus size={16} />
          New Transaction
        </Button>
      </PageHeader>
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-border">
        {[
          "All statuses",
          "Intake",
          "Validation",
          "Ready to Push",
          "Registered",
        ].map((value) => (
          <button
            key={value}
            onClick={() => {
              setStatus(value)
              setCurrent(1)
            }}
            className={`min-h-11 whitespace-nowrap border-b-2 px-4 text-xs font-medium ${
              status === value
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            {value === "All statuses" ? "All transactions" : value}
            {value === "All statuses" && (
              <span className="ms-2 rounded bg-slate-100 px-1.5 py-0.5 text-[9px]">
                {cases.length}
              </span>
            )}
          </button>
        ))}
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-44 flex-1">
            <Search
              size={15}
              className="absolute start-3 top-3 text-muted-foreground"
            />
            <input
              aria-label="Search transactions"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setCurrent(1)
              }}
              placeholder="Search case, property or party…"
              className={`${fieldClass} ps-9`}
            />
          </div>
          <select
            aria-label="Transaction type"
            className={`${fieldClass} w-auto`}
            value={type}
            onChange={(event) => {
              setType(event.target.value)
              setCurrent(1)
            }}
          >
            {[
              "All types",
              "New Lease",
              "Renewal",
              "Change of Landlord",
              "Cancellation",
            ].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <Button onClick={() => setFilters(!filters)}>
            <ListFilter size={15} />
            Filters
            {filters && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Button>
        </div>
        {filters && (
          <div className="grid gap-4 border-b border-border bg-slate-50/60 p-4 sm:grid-cols-3">
            <Field label="Status" required>
              <select
                className={fieldClass}
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value)
                  setCurrent(1)
                }}
              >
                {[
                  "All statuses",
                  "Draft",
                  "Intake",
                  "Validation",
                  "Rework",
                  "Ready to Push",
                  "Awaiting Signature",
                  "Registered",
                  "Push Failed",
                ].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </Field>
            <Field label="Broker" required>
              <select
                className={fieldClass}
                value={broker}
                onChange={(event) => {
                  setBroker(event.target.value)
                  setCurrent(1)
                }}
              >
                {[
                  "All brokers",
                  "Sara Al Hashimi",
                  "Omar Hassan",
                  "Rami Khalil",
                ].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </Field>
            <Field label="Date range">
              <div className="flex flex-wrap gap-2">
                <input
                  aria-label="From date"
                  type="date"
                  value={dateFrom}
                  onChange={(event) => {
                    setDateFrom(event.target.value)
                    setCurrent(1)
                  }}
                  className={`${fieldClass} flex-1`}
                />
                <input
                  aria-label="To date"
                  type="date"
                  value={dateTo}
                  onChange={(event) => {
                    setDateTo(event.target.value)
                    setCurrent(1)
                  }}
                  className={`${fieldClass} flex-1`}
                />
              </div>
            </Field>
            <Field label="Property type">
              <select
                className={fieldClass}
                value={propertyType}
                onChange={(event) => {
                  setPropertyType(event.target.value)
                  setCurrent(1)
                }}
              >
                <option>All properties</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </Field>
            <Field label="Document status">
              <select
                className={fieldClass}
                value={documentStatus}
                onChange={(event) => {
                  setDocumentStatus(event.target.value)
                  setCurrent(1)
                }}
              >
                <option>All documents</option>
                <option>Accepted</option>
                <option>Action Needed</option>
              </select>
            </Field>
            <Field label="DLD status">
              <select
                className={fieldClass}
                value={dldStatus}
                onChange={(event) => {
                  setDldStatus(event.target.value)
                  setCurrent(1)
                }}
              >
                <option>All gateway statuses</option>
                <option>Queued</option>
                <option>Registered</option>
                <option>Failed</option>
              </select>
            </Field>
          </div>
        )}
        {selected.length > 0 && (
          <div className="flex items-center justify-between bg-blue-50 px-5 py-3 text-xs">
            <span>{selected.length} transactions selected</span>
            <div className="flex gap-3">
              <button
                className="text-primary"
                onClick={() => {
                  exportCases(
                    cases.filter((item) => selected.includes(item.id)),
                  )
                  notify("Selected transactions exported.")
                }}
              >
                Export selection
              </button>
              <button onClick={() => setSelected([])}>Clear selection</button>
            </div>
          </div>
        )}
        {shown.length ? (
          <CaseTable
            cases={shown}
            go={go}
            selected={selected}
            onSelect={select}
            sort={sort}
            onSort={() => setSort(!sort)}
          />
        ) : (
          <Empty />
        )}
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <span className="text-[10px] text-muted-foreground">
            Showing {filtered.length ? (current - 1) * 6 + 1 : 0}–
            {Math.min(current * 6, filtered.length)} of {filtered.length}{" "}
            transactions
          </span>
          <div className="flex items-center gap-1">
            <IconButton
              icon={ChevronLeft}
              label="Previous page"
              onClick={() => setCurrent(Math.max(1, current - 1))}
            />
            <span className="grid h-8 w-8 place-items-center rounded-md bg-blue-50 text-xs font-medium text-primary">
              {current}
            </span>
            <IconButton
              icon={ChevronRight}
              label="Next page"
              onClick={() =>
                setCurrent(
                  Math.min(
                    Math.max(1, Math.ceil(filtered.length / 6)),
                    current + 1,
                  ),
                )
              }
            />
          </div>
        </div>
      </Card>
    </>
  )
}

type FormValues = Record<string, string>
const defaultForm: FormValues = {
  type: "New Lease",
  propertyType: "Apartment",
  usage: "Residential",
  emirate: "Dubai",
  area: "Dubai Marina",
  building: "Marina Heights",
  unit: "1204",
  floor: "12",
  plot: "392-218",
  makani: "12345 67890",
  dewa: "1280456",
  chiller: "Empower",
  chillerAccount: "",
  size: "1120",
  bedrooms: "2",
  parking: "1",
  tenantType: "Individual",
  tenant: "",
  tenantMobile: "+971",
  tenantEmail: "",
  language: "English",
  occupants: "",
  landlordType: "Individual",
  landlord: "",
  landlordMobile: "+971",
  landlordEmail: "",
  poa: "",
  rent: "125000",
  start: "2026-11-01",
  end: "2027-10-31",
  cheques: "4",
  payment: "Cheque",
  deposit: "6250",
  refundable: "Yes",
  commission: "6250",
  feeBearer: "Tenant",
  furnishing: "Unfurnished",
  notes: "",
}
function NewTransaction({
  onCreate,
  onDraft,
  onBack,
  rtl,
}: {
  onCreate: (item: Case) => void
  onDraft: (item: Case) => void
  onBack: () => void
  rtl: boolean
}) {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<FormValues>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("ejari-new-draft") || "null") ||
        defaultForm
      )
    } catch {
      return defaultForm
    }
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  useEffect(() => {
    localStorage.setItem("ejari-new-draft", JSON.stringify(values))
  }, [values])
  const steps = [
    "Transaction Type",
    "Property",
    "Parties",
    "Commercial Terms",
    "Review & Create",
  ]
  const input = (
    key: string,
    label: string,
    required = false,
    type = "text",
    options?: string[],
  ) => (
    <Field key={key} label={label} required={required}>
      {options ? (
        <select
          value={values[key]}
          onChange={(event) =>
            setValues({ ...values, [key]: event.target.value })
          }
          className={fieldClass}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          value={values[key]}
          type={type}
          required={required}
          aria-invalid={!!errors[key]}
          onChange={(event) => {
            setValues({ ...values, [key]: event.target.value })
            setErrors({ ...errors, [key]: "" })
          }}
          className={`${fieldClass} ${errors[key] ? "border-red-400" : ""}`}
        />
      )}
      {errors[key] && (
        <span role="alert" className="block text-[11px] text-red-600">
          {errors[key]}
        </span>
      )}
    </Field>
  )
  const next = () => {
    const needed =
      step === 1
        ? ["building", "unit", "area", "dewa"]
        : step === 2
          ? [
              "tenant",
              "tenantMobile",
              "tenantEmail",
              "landlord",
              "landlordMobile",
              "landlordEmail",
              ...(values.landlordType === "Represented by POA" ? ["poa"] : []),
            ]
          : step === 3
            ? ["rent", "start", "end", "cheques"]
            : []
    const invalid: Record<string, string> = {}
    needed.forEach((key) => {
      if (!values[key]?.trim()) invalid[key] = "This field is required."
      if (
        key.includes("Email") &&
        !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values[key])
      )
        invalid[key] = "Enter a valid email address."
      if (
        key.includes("Mobile") &&
        !/^\+971\s?\d[\d\s]{7,11}$/.test(values[key])
      )
        invalid[key] = "Enter a valid UAE mobile number."
    })
    if (step === 3) {
      if (Number(values.rent) <= 0)
        invalid.rent = "Annual rent must be greater than zero."
      if (values.end <= values.start)
        invalid.end = "End date must be after the start date."
      if (Number(values.cheques) < 1)
        invalid.cheques = "At least one instalment is required."
    }
    setErrors(invalid)
    if (!Object.keys(invalid).length) setStep(Math.min(4, step + 1))
  }
  const make = (draft = false): Case => ({
    id: `EJR-2026-${String(Date.now()).slice(-6)}`,
    property: `Unit ${values.unit || "—"}, ${values.building || "New property"}`,
    area: values.area,
    tenant: values.tenant || "Not provided",
    landlord: values.landlord || "Not provided",
    type: values.type,
    rent: Number(values.rent) || 0,
    broker: "Sara Al Hashimi",
    status: draft ? "Draft" : "Intake",
    updated: "Just now",
  })
  return (
    <>
      <PageHeader
        title={rtl ? "معاملة جديدة" : "New Transaction"}
        subtitle="Create a tenancy case. You can send secure intake links once it’s ready."
        eyebrow="Transactions / New Transaction"
      >
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
          <CheckCheck size={15} />
          Draft autosaved locally
        </div>
      </PageHeader>
      <div className="mb-6 grid grid-cols-5 gap-2">
        {steps.map((label, index) => (
          <button
            key={label}
            disabled={index > step}
            onClick={() => setStep(index)}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-center sm:flex-row sm:text-start ${
              index === step
                ? "border-blue-200 bg-blue-50"
                : "border-border bg-white"
            }`}
          >
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
                index < step
                  ? "bg-emerald-100 text-emerald-700"
                  : index === step
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              {index < step ? <Check size={14} /> : index + 1}
            </span>
            <span className="hidden text-[11px] font-medium sm:block">
              {label}
            </span>
          </button>
        ))}
      </div>
      <Card className="mx-auto max-w-5xl">
        <div className="border-b border-border px-6 py-5">
          <h2 className="text-base font-semibold">{steps[step]}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Step {step + 1} of 5 · <span className="text-red-600">*</span>{" "}
            indicates a required field
          </p>
        </div>
        <div className="p-6">
          {step === 0 && (
            <>
              <p className="mb-5 text-sm text-muted-foreground">
                Choose the transaction you want to register.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    name: "New Lease",
                    text: "Create a new tenancy agreement and Ejari registration.",
                    icon: House,
                  },
                  {
                    name: "Renewal",
                    text: "Renew an existing tenancy for a new contract period.",
                    icon: RefreshCw,
                  },
                  {
                    name: "Change of Landlord",
                    text: "Update ownership while retaining tenancy details.",
                    icon: Users,
                  },
                  {
                    name: "Cancellation",
                    text: "Cancel an existing Ejari tenancy registration.",
                    icon: FileText,
                  },
                ].map(({ name, text, icon: Icon }) => (
                  <label
                    key={name}
                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-5 ${
                      values.type === name
                        ? "border-primary bg-blue-50/40 ring-1 ring-primary"
                        : "border-border hover:bg-slate-50"
                    }`}
                  >
                    <input
                      className="mt-1 accent-primary"
                      type="radio"
                      name="transaction-type"
                      value={name}
                      checked={values.type === name}
                      onChange={() => setValues({ ...values, type: name })}
                    />
                    <div>
                      <Icon size={22} className="mb-3 text-primary" />
                      <p className="font-semibold">{name}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {text}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {input("propertyType", "Property Type", true, "text", [
                "Apartment",
                "Villa",
                "Townhouse",
                "Office",
                "Retail",
              ])}
              {input("usage", "Usage", true, "text", [
                "Residential",
                "Commercial",
              ])}
              {input("emirate", "Emirate", true, "text", ["Dubai"])}
              {input("area", "Community / Area", true)}
              {input("building", "Building / Project Name", true)}
              {input("unit", "Unit Number", true)}
              {input("floor", "Floor")}
              {input("plot", "Plot Number")}
              {input("makani", "Makani Number")}
              {input("dewa", "DEWA Premise Number", true)}
              {input("chiller", "Chiller Provider", false, "text", [
                "Empower",
                "Emicool",
                "District cooling",
                "Not applicable",
              ])}
              {input("chillerAccount", "Chiller Account Number")}
              {input("size", "Size (sq ft)", true, "number")}
              {input("bedrooms", "Bedrooms", true, "text", [
                "Studio",
                "1",
                "2",
                "3",
                "4",
                "5+",
              ])}
              {input("parking", "Parking Slots", false, "number")}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-7">
              <div>
                <h3 className="mb-5 flex items-center gap-2 font-semibold">
                  <Users size={17} className="text-primary" />
                  Tenant details
                </h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {input("tenantType", "Party Type", true, "text", [
                    "Individual",
                    "Corporate",
                  ])}
                  {input("tenant", "Full Name", true)}
                  {input("tenantMobile", "Mobile", true, "tel")}
                  {input("tenantEmail", "Email", true, "email")}
                  {input("language", "Preferred Language", true, "text", [
                    "English",
                    "Arabic",
                  ])}
                  {input("occupants", "Additional Occupants")}
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="mb-5 flex items-center gap-2 font-semibold">
                  <Building2 size={17} className="text-primary" />
                  Landlord details
                </h3>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {input("landlordType", "Party Type", true, "text", [
                    "Individual",
                    "Corporate",
                    "Joint Owners",
                    "Represented by POA",
                  ])}
                  {input("landlord", "Name", true)}
                  {input("landlordMobile", "Mobile", true, "tel")}
                  {input("landlordEmail", "Email", true, "email")}
                  {values.landlordType === "Represented by POA" &&
                    input("poa", "POA Reference & Representative", true)}
                </div>
              </div>
              <Alert>
                Clients will securely verify their identity and provide
                documents through the intake portal. No account or password is
                needed.
              </Alert>
            </div>
          )}
          {step === 3 && (
            <>
              <div className="mb-5 flex justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-muted-foreground">
                  RERA rent index
                </span>
                <Badge status="Pending" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {input("rent", "Annual Rent (AED)", true, "number")}
                {input("start", "Contract Start Date", true, "date")}
                {input("end", "Contract End Date", true, "date")}
                {input(
                  "cheques",
                  "Number of Cheques / Instalments",
                  true,
                  "number",
                )}
                {input("payment", "Payment Mode", true, "text", [
                  "Cheque",
                  "Bank Transfer",
                  "Cash",
                ])}
                {input("deposit", "Security Deposit (AED)", false, "number")}
                {input("refundable", "Deposit Refundable", true, "text", [
                  "Yes",
                  "No",
                ])}
                {input(
                  "commission",
                  "Agency Commission (AED)",
                  false,
                  "number",
                )}
                {input("feeBearer", "Ejari Fee Bearer", true, "text", [
                  "Tenant",
                  "Landlord",
                  "Agency",
                ])}
                {input("furnishing", "Furnishing", true, "text", [
                  "Unfurnished",
                  "Furnished",
                  "Partly furnished",
                ])}
              </div>
              <div className="mt-5">
                <Field label="Contract Notes">
                  <textarea
                    rows={3}
                    value={values.notes}
                    onChange={(event) =>
                      setValues({ ...values, notes: event.target.value })
                    }
                    className={fieldClass}
                    placeholder="Additional tenancy terms or operational notes…"
                  />
                </Field>
              </div>
              <div className="mt-5">
                <Alert>
                  Payment and cheque details are recorded as metadata only. This
                  platform does not process payments.
                </Alert>
              </div>
            </>
          )}
          {step === 4 && (
            <div className="space-y-5">
              <Alert type="success">
                Your transaction details are ready. Review the information below
                before creating your tenancy case.
              </Alert>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "Property",
                    rows: [
                      ["Type", values.type],
                      ["Property", `Unit ${values.unit}, ${values.building}`],
                      ["Community", values.area],
                      ["DEWA Premise", values.dewa],
                    ],
                  },
                  {
                    title: "Parties",
                    rows: [
                      ["Tenant", values.tenant],
                      ["Tenant contact", values.tenantEmail],
                      ["Landlord", values.landlord],
                      ["Landlord contact", values.landlordEmail],
                    ],
                  },
                  {
                    title: "Commercial terms",
                    rows: [
                      ["Annual rent", money(Number(values.rent))],
                      ["Contract period", `${values.start} – ${values.end}`],
                      ["Instalments", values.cheques],
                      ["Deposit", money(Number(values.deposit))],
                    ],
                  },
                ].map((section) => (
                  <div
                    key={section.title}
                    className="rounded-lg border border-border p-5"
                  >
                    <h3 className="mb-4 font-semibold">{section.title}</h3>
                    <dl className="space-y-3">
                      {section.rows.map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between gap-4 text-xs"
                        >
                          <dt className="shrink-0 text-muted-foreground">
                            {label}
                          </dt>
                          <dd className="text-end font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 rounded-b-xl border-t border-border bg-white p-5">
          <Button
            variant="ghost"
            onClick={() => (step === 0 ? onBack() : setStep(step - 1))}
          >
            <ArrowLeft size={15} />
            Back
          </Button>
          <div className="flex gap-3">
            <Button onClick={() => onDraft(make(true))}>Save Draft</Button>
            <Button
              variant="primary"
              onClick={() =>
                step === 4
                  ? (localStorage.removeItem("ejari-new-draft"),
                    onCreate(make()))
                  : next()
              }
            >
              {step === 4 ? "Create Transaction" : "Continue"}
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

const documentList = [
  {
    name: "Passport",
    party: "Tenant",
    status: "Accepted",
    ocr: "Complete",
    version: 1,
  },
  {
    name: "Emirates ID",
    party: "Tenant",
    status: "Action Needed",
    ocr: "Complete",
    version: 2,
  },
  {
    name: "Residence Visa",
    party: "Tenant",
    status: "Accepted",
    ocr: "Complete",
    version: 1,
  },
  {
    name: "Title Deed",
    party: "Landlord",
    status: "Accepted",
    ocr: "Complete",
    version: 1,
  },
  {
    name: "Landlord Emirates ID",
    party: "Landlord",
    status: "Pending",
    ocr: "Not started",
    version: 1,
  },
  {
    name: "Tenancy Contract",
    party: "Both",
    status: "Processing",
    ocr: "Processing",
    version: 1,
  },
]
function DetailRows({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="space-y-3">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-wrap items-start justify-between gap-2 text-xs"
        >
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
function CaseDetail({
  item,
  documents,
  go,
  onIntake,
  notify,
  onPush,
  update,
  rtl,
}: {
  item: Case
  documents: typeof documentList
  go: (path: string) => void
  onIntake: () => void
  notify: (value: string) => void
  onPush: () => void
  update: (status: string) => void
  rtl: boolean
}) {
  const [tab, setTab] = useState("Overview")
  const [more, setMore] = useState(false)
  const [edit, setEdit] = useState(false)
  const lifecycle = [
    "Draft",
    "Intake",
    "Partial",
    "Validation",
    "Ready to Push",
    "Awaiting Signature",
    "Push Queued",
    "Push In Progress",
    "Registered",
  ]
  const currentStep = lifecycle.indexOf(
    item.status === "Rework"
      ? "Validation"
      : item.status === "Push Failed"
        ? "Push In Progress"
        : item.status,
  )
  return (
    <>
      <PageHeader
        title={item.id}
        subtitle={item.property + " · " + item.area}
        eyebrow="Transactions / Case workspace"
      >
        <Badge status={item.status} />
        <Button onClick={onIntake}>
          <Send size={14} />
          Send Intake Links
        </Button>
        <Button onClick={() => setEdit(true)}>
          <FilePenLine size={14} />
          Edit
        </Button>
        <Button variant="primary" onClick={onPush}>
          <Send size={14} />
          Push to DLD
        </Button>
        <div className="relative">
          <IconButton
            icon={Ellipsis}
            label="More case actions"
            onClick={() => setMore(!more)}
          />
          {more && (
            <div className="absolute end-0 z-10 w-44 rounded-lg border border-border bg-white p-2 shadow-xl">
              <button
                className="min-h-11 w-full px-3 text-start text-xs hover:bg-slate-50"
                onClick={() => go("/new")}
              >
                Duplicate transaction
              </button>
              <button
                className="min-h-11 w-full px-3 text-start text-xs hover:bg-slate-50"
                onClick={() => go("/contracts")}
              >
                Generate Contract
              </button>
              <button
                className="min-h-11 w-full px-3 text-start text-xs hover:bg-slate-50"
                onClick={() => exportCases([item])}
              >
                Export case
              </button>
            </div>
          )}
        </div>
      </PageHeader>
      <Card className="mb-6">
        <div className="grid grid-cols-3 gap-3 p-5 sm:grid-cols-5 xl:grid-cols-9">
          {[
            "Draft",
            "Intake",
            "Partial",
            "Validation",
            "Ready to Push",
            "Awaiting Signature",
            "Push Queued",
            "Push In Progress",
            "Registered",
          ].map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] ${
                  index < currentStep
                    ? "bg-emerald-100 text-emerald-700"
                    : label === item.status
                      ? "bg-primary text-white ring-4 ring-blue-50"
                      : "bg-slate-100 text-muted-foreground"
                }`}
              >
                {index < currentStep ? <Check size={12} /> : index + 1}
              </span>
              <span
                className={`text-[9px] ${
                  label === item.status
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-border px-5 py-2 text-[10px] text-muted-foreground">
          Rework returns a case to validation. Amendments and cancellation are
          available after registration.
        </div>
      </Card>
      <div className="mb-5 flex gap-2 overflow-x-auto border-b border-border">
        {[
          "Overview",
          "Documents",
          "Validation",
          "Contract",
          "DLD / Ejari",
          "Audit Timeline",
        ].map((value) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`min-h-11 shrink-0 border-b-2 px-4 text-xs font-medium ${
              tab === value
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      {tab === "Overview" && (
        <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <Card>
              <CardHeader
                title={rtl ? "العقار" : "Property"}
                icon={Building2}
              />
              <div className="grid gap-6 px-5 pb-5 sm:grid-cols-2">
                <DetailRows
                  rows={[
                    ["Property", item.property],
                    ["Community", item.area],
                    ["Property type", "Apartment · Residential"],
                    ["Size", "1,120 sq ft"],
                  ]}
                />
                <DetailRows
                  rows={[
                    ["DEWA premise", <bdi>1280456</bdi>],
                    ["Makani number", <bdi>12345 67890</bdi>],
                    ["Bedrooms / Parking", "2 bedrooms · 1 parking"],
                    ["Title deed", "TD-2024-87651"],
                  ]}
                />
              </div>
            </Card>
            <Card>
              <CardHeader title={rtl ? "الأطراف" : "Parties"} icon={Users} />
              <div className="grid gap-5 px-5 pb-5 sm:grid-cols-2">
                {[
                  {
                    role: "Tenant",
                    name: item.tenant,
                    email: "muhammad.ahmed@example.com",
                    phone: "+971 50 111 2234",
                  },
                  {
                    role: "Landlord",
                    name: item.landlord,
                    email: "khalid.almansoori@example.com",
                    phone: "+971 55 987 6543",
                  },
                ].map((party) => (
                  <div
                    key={party.role}
                    className="rounded-lg border border-border p-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar name={party.name} />
                      <div>
                        <p className="text-[10px] text-muted-foreground">
                          {party.role} · Individual
                        </p>
                        <p className="mt-1 text-xs font-semibold">
                          {party.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      <bdi>{party.email}</bdi>
                    </p>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      <bdi>{party.phone}</bdi>
                    </p>
                    <div className="mt-3">
                      <Badge status="Verified" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <CardHeader title="Commercial terms" icon={CreditCard} />
              <div className="grid gap-6 px-5 pb-5 sm:grid-cols-2">
                <DetailRows
                  rows={[
                    ["Annual rent", money(item.rent)],
                    ["Contract period", "01 Nov 2026 – 31 Oct 2027"],
                    ["Payment mode", "4 cheques"],
                    ["Security deposit", money(6250)],
                  ]}
                />
                <DetailRows
                  rows={[
                    ["Agency commission", money(6250)],
                    ["Ejari fee bearer", "Tenant"],
                    ["Furnishing", "Unfurnished"],
                    ["Deposit refundable", "Yes"],
                  ]}
                />
              </div>
            </Card>
          </div>
          <div className="space-y-5">
            <Card>
              <CardHeader title="Intake progress" icon={Link2} />
              <div className="space-y-6 px-5 pb-5">
                {[
                  {
                    name: "Tenant",
                    completed: "2 / 5",
                    value: 40,
                    docs: "Passport · Residence visa",
                  },
                  {
                    name: "Landlord",
                    completed: "3 / 6",
                    value: 50,
                    docs: "Title deed · Passport · Ownership proof",
                  },
                ].map((party) => (
                  <div key={party.name}>
                    <div className="mb-3 flex justify-between">
                      <span className="text-xs font-semibold">
                        {party.name}
                      </span>
                      <Badge status="Verified" />
                    </div>
                    <Progress value={party.value} />
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {party.completed} documents complete
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-[10px] text-emerald-700">
                      <Check size={12} />
                      {party.docs}
                    </p>
                  </div>
                ))}
                <Button className="w-full" onClick={onIntake}>
                  <Send size={14} />
                  Manage intake links
                </Button>
              </div>
            </Card>
            <Card>
              <CardHeader title="Validation findings">
                <Badge status="Action Needed" />
              </CardHeader>
              <div className="space-y-3 px-5 pb-5">
                <Alert type="error">
                  <strong>2 hard blocks</strong>
                  <br />
                  Emirates ID expiry is unreadable.
                  <br />
                  Signed tenancy contract is missing.
                </Alert>
                <Alert type="warning">
                  <strong>1 soft block</strong>
                  <br />
                  Tenant name differs slightly from passport OCR.
                </Alert>
                <Button className="w-full" onClick={() => go("/validation")}>
                  Review validation <ArrowRight size={14} />
                </Button>
              </div>
            </Card>
            <Card>
              <CardHeader title="Case ownership" />
              <div className="px-5 pb-5">
                <DetailRows
                  rows={[
                    ["Assigned broker", item.broker],
                    ["Document controller", "Mariam Saeed"],
                    ["Created", "10 Oct 2026, 09:15 GST"],
                  ]}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
      {tab === "Documents" && (
        <Card>
          <CardHeader
            title="Document checklist"
            subtitle="Required documents and their latest verified versions"
          >
            <Button variant="primary" onClick={() => go("/documents")}>
              <FileSearch size={15} />
              Open document workspace
            </Button>
          </CardHeader>
          <div className="divide-y divide-border">
            {documents.map((doc) => (
              <div
                key={doc.name}
                className="flex flex-wrap items-center gap-4 px-5 py-4"
              >
                <FileText size={19} className="text-muted-foreground" />
                <div className="min-w-40 flex-1">
                  <p className="text-xs font-medium">{doc.name}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {doc.party} · Required · Version {doc.version}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  OCR: {doc.ocr}
                </span>
                <Badge status={doc.status} />
                <Button variant="ghost" onClick={() => go("/documents")}>
                  Review <ChevronRight size={14} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
      {tab === "Validation" && (
        <Card>
          <CardHeader
            title="Validation rules"
            subtitle="Hard blocks must be resolved before DLD submission."
          />
          <div className="space-y-4 px-5 pb-5">
            <Alert type="error">
              <strong>Hard block · ID-EXP-001</strong>
              <br />
              Emirates ID expiry date cannot be verified from the uploaded scan.
            </Alert>
            <Alert type="error">
              <strong>Hard block · CON-SIG-001</strong>
              <br />
              The tenancy contract must be signed by both parties.
            </Alert>
            <Alert type="warning">
              <strong>Soft block · NAME-002</strong>
              <br />
              Tenant name mismatch: “Muhammad Ahmed” vs “Mohammad Ahmed”.
              Document controller review required.
            </Alert>
            <Alert type="success">
              12 checks passed: DEWA format, title deed ownership, passport
              validity, contract dates, rent amount and party contact
              verification.
            </Alert>
            <Button variant="primary" onClick={() => go("/validation")}>
              Open validation workspace <ArrowRight size={14} />
            </Button>
          </div>
        </Card>
      )}
      {tab === "Contract" && (
        <Card>
          <CardHeader
            title="Tenancy contract"
            subtitle="Bilingual RERA tenancy agreement · Version 1"
          >
            <Badge status="Awaiting Signature" />
          </CardHeader>
          <div className="space-y-5 px-5 pb-5">
            <Alert>
              Draft generated on 12 Oct 2026. Tenant and landlord signatures are
              still outstanding.
            </Alert>
            <DetailRows
              rows={[
                ["Template", "RERA Standard Tenancy · English / Arabic"],
                ["Version", "v1 · Current"],
                ["Tenant signature", "Not sent"],
                ["Landlord signature", "Not sent"],
              ]}
            />
            <Button variant="primary" onClick={() => go("/contracts")}>
              Manage contract <ArrowRight size={14} />
            </Button>
          </div>
        </Card>
      )}
      {tab === "DLD / Ejari" && (
        <Card>
          <CardHeader
            title="DLD / Ejari registration"
            subtitle="No registration has been confirmed for this case."
          >
            <Badge status="Draft" />
          </CardHeader>
          <div className="space-y-4 px-5 pb-5">
            <DetailRows
              rows={[
                ["Payload validation", "Blocked · 2 unresolved rules"],
                ["Push status", "Not queued"],
                ["Gateway reference", "Not available"],
                ["Ejari contract number", "Awaiting gateway confirmation"],
                ["Retry status", "Not applicable"],
              ]}
            />
            <Button onClick={() => go("/integration")}>
              Open gateway workspace <ArrowRight size={14} />
            </Button>
          </div>
        </Card>
      )}
      {tab === "Audit Timeline" && (
        <Card>
          <CardHeader
            title="Immutable case activity"
            subtitle="All events are timestamped in GST and cannot be edited."
          />
          <div className="space-y-5 px-5 pb-6">
            {[
              {
                time: "12 Oct 2026 · 10:38",
                title: "Passport accepted",
                actor: "Mariam Saeed · Document Controller",
              },
              {
                time: "12 Oct 2026 · 10:32",
                title: "Emirates ID rework requested",
                actor: "Mariam Saeed · Document Controller",
              },
              {
                time: "11 Oct 2026 · 16:15",
                title: "Tenant submitted intake documents",
                actor: item.tenant,
              },
              {
                time: "10 Oct 2026 · 09:15",
                title: "Transaction created",
                actor: item.broker,
              },
            ].map((event) => (
              <div key={event.title} className="flex gap-4">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-50">
                  <History size={15} className="text-primary" />
                </span>
                <div>
                  <p className="text-xs font-semibold">{event.title}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {event.actor}
                  </p>
                  <p className="mt-1 text-[9px] text-muted-foreground">
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {edit && (
        <Modal title="Edit transaction status" onClose={() => setEdit(false)}>
          <Alert>
            Property and party changes must be reviewed before submission. You
            may return this case to draft to revise its details.
          </Alert>
          <div className="mt-5 flex justify-end gap-2">
            <Button onClick={() => setEdit(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                update("Draft")
                notify("Case returned to draft for review.")
                setEdit(false)
              }}
            >
              Return to Draft
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

function SendIntake({
  item,
  onClose,
  notify,
}: {
  item: Case
  onClose: () => void
  notify: (value: string) => void
}) {
  const [channel, setChannel] = useState("WhatsApp")
  const [statuses, setStatuses] = useState(["Delivered", "Failed"])
  const [revoking, setRevoking] = useState<number | null>(null)
  return (
    <Modal title="Send secure intake links" onClose={onClose} wide>
      <p className="mb-5 text-xs text-muted-foreground">
        {item.id} · {item.property}
        <br />
        <span className="mt-1 inline-block">
          Links expire after 48 hours. Each client must verify their mobile
          number by OTP.
        </span>
      </p>
      <div className="mb-5 flex flex-wrap gap-2">
        {[
          { name: "SMS", icon: Smartphone },
          { name: "Email", icon: Mail },
          { name: "WhatsApp", icon: MessageSquare },
          { name: "Copy Link", icon: Copy },
        ].map(({ name, icon: Icon }) => (
          <Button
            key={name}
            variant={channel === name ? "primary" : "secondary"}
            onClick={() => setChannel(name)}
          >
            <Icon size={15} />
            {name}
          </Button>
        ))}
      </div>
      <div className="space-y-4">
        {[
          {
            role: "Tenant",
            name: item.tenant,
            contact: "+971 50 111 2234",
            email: "muhammad.ahmed@example.com",
          },
          {
            role: "Landlord",
            name: item.landlord,
            contact: "+971 55 987 6543",
            email: "khalid.almansoori@example.com",
          },
        ].map((party, index) => (
          <div key={party.role} className="rounded-xl border border-border p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name={party.name} />
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    {party.role}
                  </p>
                  <p className="mt-1 text-xs font-semibold">{party.name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    <bdi>
                      {channel === "Email" ? party.email : party.contact}
                    </bdi>
                  </p>
                </div>
              </div>
              <Badge status={statuses[index]} />
            </div>
            {statuses[index] === "Failed" && (
              <Alert type="error">
                Delivery failed: recipient temporarily unavailable. Retry via
                SMS or choose a different channel.
              </Alert>
            )}
            <div className="my-4 grid grid-cols-7 gap-1">
              {[
                "Not Sent",
                "Sent",
                "Delivered",
                "Opened",
                "Verified",
                "In Progress",
                "Submitted",
              ].map((text, point) => (
                <div key={text} className="text-center">
                  <div
                    className={`mb-2 h-1 rounded-full ${
                      point <= (index === 0 ? 4 : 1) &&
                      statuses[index] !== "Revoked"
                        ? "bg-primary"
                        : "bg-slate-100"
                    }`}
                  />
                  <span className="text-[8px] text-muted-foreground">
                    {text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-muted-foreground">
                Last sent: 12 Oct, 09:30 GST
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setRevoking(index)}
                  disabled={statuses[index] === "Revoked"}
                >
                  Revoke
                </Button>
                <Button
                  onClick={async () => {
                    if (channel === "Copy Link") {
                      await navigator.clipboard?.writeText(
                        `${window.location.origin}/intake/demo-secure-token?party=${
                          index === 0 ? "tenant" : "landlord"
                        }`,
                      )
                      notify(
                        "Demo intake link copied. Production links require server-issued secure tokens.",
                      )
                    } else {
                      setStatuses((items) =>
                        items.map((value, i) => (i === index ? "Sent" : value)),
                      )
                      notify(
                        `${channel} delivery request recorded for ${party.role.toLowerCase()}. Connect a messaging provider to send it.`,
                      )
                    }
                  }}
                >
                  {channel === "Copy Link" ? (
                    <Copy size={13} />
                  ) : (
                    <RefreshCw size={13} />
                  )}
                  {channel === "Copy Link" ? "Copy" : "Resend"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Alert>
          Only the designated recipient can access their intake session.
          Sensitive documents are never included in messages.
        </Alert>
      </div>
      {revoking !== null && (
        <div className="mt-5 rounded-lg border border-red-200 p-4">
          <p className="text-xs font-semibold text-red-800">
            Revoke this intake link?
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            The client will no longer be able to access this session.
          </p>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => setRevoking(null)}>Keep link</Button>
            <Button
              variant="danger"
              onClick={() => {
                setStatuses((items) =>
                  items.map((value, index) =>
                    index === revoking ? "Revoked" : value,
                  ),
                )
                setRevoking(null)
                notify("Intake link revoked in this workspace.")
              }}
            >
              Revoke link
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

function DocumentWorkspace({
  item,
  docs,
  onChange,
  notify,
}: {
  item: Case
  docs: typeof documentList
  onChange: (docs: typeof documentList) => void
  notify: (value: string) => void
}) {
  const [selected, setSelected] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(false)
  const [rework, setRework] = useState(false)
  const [reason, setReason] = useState(
    "Expiry date is unreadable. Please upload a clear photo of both sides of your Emirates ID.",
  )
  const [ocr, setOcr] = useState(false)
  const [full, setFull] = useState(false)
  const [fields, setFields] = useState({
    "Full name": "Muhammad Ahmed",
    "ID / Passport number": "784-1990-1234567-1",
    Nationality: "Pakistan",
    "Date of birth": "12 Aug 1990",
    "Expiry date": "12 Aug 2028",
  })
  const fileRef = useRef<HTMLInputElement>(null)
  const active = docs[selected]
  const change = (status: string) =>
    onChange(
      docs.map((doc, index) => (index === selected ? { ...doc, status } : doc)),
    )
  const preview = (
    <div className="flex min-h-[350px] flex-col rounded-lg border border-border bg-[#eef1f5]">
      <div className="flex items-center justify-between border-b border-border bg-white px-2 py-1">
        <span className="ps-2 text-[10px] font-medium">
          {active.name} · v{active.version}
        </span>
        <div className="flex">
          <IconButton
            icon={ZoomOut}
            label="Zoom out"
            onClick={() => setZoom(Math.max(0, zoom - 1))}
          />
          <IconButton
            icon={ZoomIn}
            label="Zoom in"
            onClick={() => setZoom(Math.min(2, zoom + 1))}
          />
          <IconButton
            icon={RotateCw}
            label="Rotate document"
            onClick={() => setRotation(!rotation)}
          />
          <IconButton
            icon={ExternalLink}
            label="Open full screen preview"
            onClick={() => setFull(true)}
          />
        </div>
      </div>
      <div className="flex min-h-[330px] flex-1 items-center justify-center overflow-hidden p-6">
        <div
          className={`w-full max-w-[380px] rounded-xl border border-[#dadace] bg-[#faf9ed] p-5 shadow-md transition-transform ${
            rotation ? "rotate-90" : ""
          } ${zoom === 2 ? "scale-125" : zoom === 0 ? "scale-75" : ""}`}
        >
          <div className="flex items-start justify-between border-b border-[#dfdecd] pb-3">
            <div>
              <p className="text-[9px] font-semibold tracking-wider text-[#665f43]">
                UNITED ARAB EMIRATES
              </p>
              <p className="mt-1 text-[8px] text-[#665f43]">
                Federal Authority for Identity and Citizenship
              </p>
            </div>
            <ShieldCheck size={23} className="text-[#8a865d]" />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded bg-[#e6e5d7]">
              <Users size={30} className="text-[#a3a28d]" />
            </div>
            <div className="min-w-0 space-y-3">
              <p className="text-[9px] text-[#7b7963]">
                {active.name.toUpperCase()} · DEMO DOCUMENT
              </p>
              <p className="text-[11px] font-semibold text-[#414532]">
                MUHAMMAD AHMED
              </p>
              <p className="text-[9px] text-[#555a45]">
                ID No: 784-1990-1234567-1
              </p>
              <p className="text-[9px] text-[#555a45]">Nationality: Pakistan</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#dfdecd] pt-3 text-[8px] text-[#686d54]">
            <p>
              Date of birth
              <br />
              <strong>12 / 08 / 1990</strong>
            </p>
            <p>
              Expiry date
              <br />
              <strong>12 / 08 / 2028</strong>
            </p>
          </div>
          <p className="mt-4 text-[7px] tracking-[1.5px] text-[#8a8975]">
            FICTIONAL SAMPLE · NOT A VALID IDENTITY DOCUMENT
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
        <span>{zoom === 2 ? "125%" : zoom === 0 ? "75%" : "100%"}</span>
        <span>Page 1 of 1</span>
        <IconButton
          icon={Download}
          label="Download demo document summary"
          onClick={() =>
            exportFile(
              "document-demo.txt",
              `${active.name}\nFictional demonstration document\n${JSON.stringify(fields, null, 2)}`,
              "text/plain",
            )
          }
        />
      </div>
    </div>
  )
  return (
    <>
      <PageHeader
        title="Document validation"
        subtitle={`${item.id} · ${item.property}`}
        eyebrow="Documents / Validation workspace"
      >
        <Badge status="Validation" />
        <Button
          onClick={() =>
            notify(
              "Case assigned to you. Your review will be added to the audit trail.",
            )
          }
        >
          <Users size={15} />
          Assign to me
        </Button>
      </PageHeader>
      <div className="mb-4 lg:hidden">
        <Alert type="warning">
          Larger screen recommended for comparing extracted data with document
          previews.
        </Alert>
      </div>
      <div className="grid gap-5 min-[80rem]:grid-cols-[230px_1fr] min-[100rem]:grid-cols-[240px_1fr_1fr]">
        <Card className="self-start">
          <CardHeader title="Case documents" subtitle="6 required documents" />
          <div className="space-y-1 px-2 pb-3">
            {docs.map((doc, index) => (
              <button
                key={doc.name}
                onClick={() => setSelected(index)}
                className={`flex min-h-20 w-full items-start gap-3 rounded-lg p-3 text-start ${
                  selected === index
                    ? "bg-blue-50 ring-1 ring-inset ring-blue-100"
                    : "hover:bg-slate-50"
                }`}
              >
                <FileText
                  size={18}
                  className={`mt-0.5 ${
                    selected === index
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                />
                <div>
                  <p className="mb-1.5 text-[11px] font-semibold">{doc.name}</p>
                  <Badge status={doc.status} />
                  <p className="mt-1 text-[9px] text-muted-foreground">
                    {doc.party} · Required
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="border-t border-border p-4">
            <span className="text-[10px] text-muted-foreground">
              {docs.filter((doc) => doc.status === "Accepted").length} of{" "}
              {docs.length} accepted
            </span>
            <div className="mt-2">
              <Progress
                value={
                  (docs.filter((doc) => doc.status === "Accepted").length /
                    docs.length) *
                  100
                }
                color="green"
              />
            </div>
          </div>
        </Card>
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Extracted structured data"
              subtitle={`${active.name} · OCR completed 12 Oct, 10:25 GST`}
            >
              <Badge status={ocr ? "Processing" : active.status} />
            </CardHeader>
            <div className="space-y-4 px-5 pb-5">
              {Object.entries(fields).map(([label, value], index) => (
                <label key={label} className="block">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium">{label}</span>
                    <span
                      className={`flex items-center gap-1.5 text-[9px] ${
                        index === 4 && active.status === "Action Needed"
                          ? "text-amber-700"
                          : "text-emerald-700"
                      }`}
                    >
                      {index === 4 && active.status === "Action Needed" ? (
                        <TriangleAlert size={11} />
                      ) : (
                        <Check size={11} />
                      )}
                      {index === 4 ? "72%" : index === 0 ? "96%" : "99%"}{" "}
                      confidence
                    </span>
                  </div>
                  <input
                    value={value}
                    onChange={(event) =>
                      setFields({ ...fields, [label]: event.target.value })
                    }
                    className={fieldClass}
                  />
                  {index === 4 && active.status === "Action Needed" && (
                    <span className="mt-1.5 block text-[10px] text-amber-700">
                      Please verify against the original document.
                    </span>
                  )}
                </label>
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Validation findings" />
            <div className="space-y-3 px-5 pb-5">
              {active.status === "Action Needed" ? (
                <>
                  <Alert type="error">
                    <strong>Hard block · ID-EXP-001</strong>
                    <br />
                    Expiry date is below confidence threshold (90%). Manual
                    confirmation is required.
                  </Alert>
                  <Alert type="warning">
                    <strong>Soft block · NAME-002</strong>
                    <br />
                    Name spelling differs from the case record. Confirm
                    transliteration before acceptance.
                  </Alert>
                </>
              ) : (
                <Alert type="success">
                  Document format and identity checks passed. Confirm extracted
                  fields before accepting.
                </Alert>
              )}
              <p className="text-[10px] text-muted-foreground">
                Changes will be recorded with your user identity and timestamp.
              </p>
            </div>
          </Card>
          <div className="min-[100rem]:hidden">{preview}</div>
        </div>
        <div className="hidden min-w-0 min-[100rem]:block">
          {preview}
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            Fictional document preview for interface demonstration
          </p>
        </div>
      </div>
      <div className="sticky bottom-0 z-10 mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
        <span className="text-[11px] text-muted-foreground">
          Reviewing {active.name} · Version {active.version}
        </span>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(event) => {
              if (event.target.files?.length) {
                change("Pending")
                notify(
                  "Replacement selected. Connect document storage to upload and retain a new version.",
                )
              }
            }}
          />
          <Button onClick={() => fileRef.current?.click()}>
            <Upload size={14} />
            Replace Document
          </Button>
          <Button
            onClick={() => {
              setOcr(true)
              setTimeout(() => {
                setOcr(false)
                notify(
                  "Demo OCR review refreshed. Live OCR requires a connected extraction service.",
                )
              }, 1200)
            }}
          >
            {ocr ? (
              <LoaderCircle size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            Run OCR Again
          </Button>
          <Button variant="danger" onClick={() => setRework(true)}>
            Request Rework
          </Button>
          <Button
            variant="primary"
            disabled={ocr || active.status === "Accepted"}
            onClick={() => {
              change("Accepted")
              notify(`${active.name} accepted after manual field review.`)
            }}
          >
            <Check size={14} />
            Accept
          </Button>
        </div>
      </div>
      {rework && (
        <Modal title="Request document rework" onClose={() => setRework(false)}>
          <Field label="Reason shown to the client" required>
            <textarea
              className={fieldClass}
              rows={4}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </Field>
          <div className="mt-4">
            <Alert>
              The client will be asked to replace this document. Existing
              versions remain in the audit history.
            </Alert>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button onClick={() => setRework(false)}>Cancel</Button>
            <Button
              variant="primary"
              disabled={!reason.trim()}
              onClick={() => {
                change("Action Needed")
                setRework(false)
                notify("Rework request recorded for the client.")
              }}
            >
              Request Rework <Send size={14} />
            </Button>
          </div>
        </Modal>
      )}
      {full && (
        <Modal title="Document preview" onClose={() => setFull(false)} wide>
          {preview}
        </Modal>
      )}
    </>
  )
}

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: ReactNode[][]
}) {
  return (
    <>
      <div className="relative hidden overflow-x-auto lg:block">
        <table className="w-full text-[11px]">
          <thead className="border-y border-border bg-slate-50/70 text-muted-foreground">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-5 py-3 text-start text-[10px] font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-border last:border-0 hover:bg-slate-50/60"
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-5 py-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-border lg:hidden">
        {rows.map((row, index) => (
          <div key={index} className="space-y-3 p-4">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="flex items-start justify-between gap-3 text-xs"
              >
                <span className="text-muted-foreground">
                  {headers[cellIndex]}
                </span>
                <span className="text-end">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
function IntakeLinks({
  cases,
  send,
  notify,
  go,
}: {
  cases: Case[]
  send: () => void
  notify: (value: string) => void
  go: (path: string) => void
}) {
  const [query, setQuery] = useState("")
  const [revoked, setRevoked] = useState<string[]>([])
  const [confirm, setConfirm] = useState("")
  return (
    <>
      <PageHeader
        title="Intake Links"
        subtitle="Secure client sessions, delivery status, and document completion."
      >
        <Button onClick={() => go("/intake/demo-secure-token")}>
          <Smartphone size={15} />
          Preview client portal
        </Button>
        <Button variant="primary" onClick={send}>
          <Send size={15} />
          Send Intake Links
        </Button>
      </PageHeader>
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { title: "Active links", value: 62 },
          { title: "Verified clients", value: 43 },
          { title: "Expiring in 24 hours", value: 7 },
          { title: "Delivery failures", value: 2 },
        ].map((item) => (
          <Card key={item.title} className="p-5">
            <p className="text-xs text-muted-foreground">{item.title}</p>
            <p className="mt-3 text-2xl font-semibold">{item.value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <div className="p-4">
          <input
            className={`${fieldClass} max-w-sm`}
            aria-label="Search intake links"
            placeholder="Search client or case ID…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <SimpleTable
          headers={[
            "Case",
            "Recipient",
            "Channel",
            "Delivery",
            "Intake",
            "Expires",
            "Actions",
          ]}
          rows={cases
            .slice(0, 6)
            .filter((item) =>
              `${item.id} ${item.tenant}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((item, index) => [
              <button
                className="text-primary"
                onClick={() => go(`/case/${item.id}`)}
              >
                {item.id}
              </button>,
              <div>
                <p className="font-medium">{item.tenant}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Tenant · OTP verified
                </p>
              </div>,
              index % 2 ? "SMS" : "WhatsApp",
              <Badge
                status={
                  revoked.includes(item.id)
                    ? "Revoked"
                    : index === 2
                      ? "Failed"
                      : "Delivered"
                }
              />,
              <div className="min-w-24">
                <Progress value={index === 0 ? 50 : index === 1 ? 100 : 33} />
                <p className="mt-2 text-[10px] text-muted-foreground">
                  {index === 1 ? "6 / 6" : "2 / 6"} documents
                </p>
              </div>,
              index === 2 ? (
                <span className="text-amber-700">Today, 16:00</span>
              ) : (
                "14 Oct, 09:30"
              ),
              <div className="flex gap-2">
                <Button variant="ghost" onClick={send}>
                  Resend
                </Button>
                <Button
                  variant="ghost"
                  disabled={revoked.includes(item.id)}
                  onClick={() => setConfirm(item.id)}
                >
                  Revoke
                </Button>
              </div>,
            ])}
        />
      </Card>
      {confirm && (
        <Modal
          title="Revoke client intake link?"
          onClose={() => setConfirm("")}
        >
          <Alert type="warning">
            This session will no longer be accessible to the client. Uploaded
            documents will be retained in the case history.
          </Alert>
          <div className="mt-5 flex justify-end gap-2">
            <Button onClick={() => setConfirm("")}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                setRevoked([...revoked, confirm])
                setConfirm("")
                notify("Client intake link revoked.")
              }}
            >
              Revoke Link
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

function downloadPDF(filename: string, lines: string[]) {
  const safe = (text: string) =>
    text
      .replace(/[^\x20-\x7E]/g, " ")
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
  const stream = `BT /F1 12 Tf 50 780 Td 20 TL ${lines.map((line, index) => `${index ? "T* " : ""}(${safe(line)}) Tj`).join("\n")} ET`
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]
  let document = "%PDF-1.4\n"
  const offsets = [0]
  objects.forEach((object, index) => {
    offsets.push(document.length)
    document += `${index + 1} 0 obj\n${object}\nendobj\n`
  })
  const xref = document.length
  document += `xref\n0 6\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
  exportFile(filename, document, "application/pdf")
}
function Contracts({
  cases,
  notify,
}: {
  cases: Case[]
  notify: (value: string) => void
}) {
  const [detail, setDetail] = useState<Case | null>(null)
  const [versions, setVersions] = useState<Record<string, number>>({})
  const [sent, setSent] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const download = (item: Case) =>
    downloadPDF(`${item.id}-contract-summary.pdf`, [
      "HORIZON PROPERTIES - TENANCY CONTRACT SUMMARY",
      "DEMONSTRATION - NOT A SIGNED LEGAL CONTRACT",
      "",
      `Case: ${item.id}`,
      `Tenant: ${item.tenant}`,
      `Landlord: ${item.landlord}`,
      `Property: ${item.property}`,
      `Community: ${item.area}`,
      `Annual rent: ${money(item.rent)}`,
      "Period: 01 Nov 2026 - 31 Oct 2027",
      "Payment: 4 cheques",
      "Both parties must sign the bilingual RERA tenancy agreement.",
    ])
  return (
    <>
      <PageHeader
        title="Contracts"
        subtitle="Generate, review, and track bilingual tenancy agreements."
      >
        <Button
          onClick={() =>
            exportFile(
              "contract-register.csv",
              "Case ID,Tenant,Version,Status\n" +
                cases
                  .map(
                    (item) =>
                      `${item.id},${item.tenant},${versions[item.id] || 1},${
                        sent.includes(item.id) ? "Awaiting signature" : "Draft"
                      }`,
                  )
                  .join("\n"),
            )
          }
        >
          <Download size={15} />
          Export
        </Button>
      </PageHeader>
      <Card>
        <div className="p-4">
          <input
            className={`${fieldClass} max-w-sm`}
            placeholder="Search case or tenant…"
            aria-label="Search contracts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <SimpleTable
          headers={[
            "Case ID",
            "Tenant",
            "Property",
            "Version",
            "Generated",
            "Signature Status",
            "Actions",
          ]}
          rows={cases
            .slice(0, 6)
            .filter((item) =>
              `${item.id} ${item.tenant}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((item) => [
              <span className="font-medium text-primary">{item.id}</span>,
              item.tenant,
              item.property,
              `v${versions[item.id] || 1}`,
              "12 Oct 2026",
              <Badge
                status={
                  sent.includes(item.id) || item.status === "Awaiting Signature"
                    ? "Awaiting Signature"
                    : item.status === "Registered"
                      ? "Accepted"
                      : "Draft"
                }
              />,
              <Button onClick={() => setDetail(item)}>
                View contract <ChevronRight size={14} />
              </Button>,
            ])}
        />
      </Card>
      {detail && (
        <Modal
          title="Bilingual RERA tenancy contract"
          onClose={() => setDetail(null)}
          wide
        >
          <div className="mb-5 flex justify-between text-xs">
            <span className="text-muted-foreground">
              {detail.id} · Version {versions[detail.id] || 1}
            </span>
            <Badge
              status={sent.includes(detail.id) ? "Awaiting Signature" : "Draft"}
            />
          </div>
          <div className="rounded-lg border border-border bg-slate-50 p-4">
            <div className="border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex justify-between border-b-2 border-[#193357] pb-4">
                <div>
                  <h3 className="text-lg font-semibold">Tenancy Contract</h3>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Unified RERA agreement · Draft preview
                  </p>
                </div>
                <div dir="rtl">
                  <h3 className="text-lg font-semibold">عقد إيجار</h3>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    العقد الموحد للإيجار
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ["Landlord / المؤجر", detail.landlord],
                  ["Tenant / المستأجر", detail.tenant],
                  ["Property / العقار", detail.property],
                  ["Annual rent / قيمة الإيجار", money(detail.rent)],
                  ["Contract period / مدة العقد", "01 Nov 2026 – 31 Oct 2027"],
                  ["Instalments / الدفعات", "4 cheques"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-3 border-b border-border pb-3 text-[11px]"
                  >
                    <span className="text-muted-foreground">{label}</span>
                    <bdi className="font-medium">{value}</bdi>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[10px] leading-relaxed text-muted-foreground">
                Both parties agree to the property, payment schedule, and
                tenancy terms stated above. This preview is fictional and is not
                a registered or signed contract.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-5 text-[10px] text-muted-foreground">
                <div className="border-t border-border pt-3">
                  Tenant signature / توقيع المستأجر
                </div>
                <div className="border-t border-border pt-3">
                  Landlord signature / توقيع المؤجر
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h4 className="mb-2 text-xs font-semibold">Version history</h4>
            <p className="text-[11px] text-muted-foreground">
              v{versions[detail.id] || 1} · Generated 12 Oct 2026 · Sara Al
              Hashimi
            </p>
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button
              onClick={() => {
                setVersions({
                  ...versions,
                  [detail.id]: (versions[detail.id] || 1) + 1,
                })
                notify("New contract draft version generated.")
              }}
            >
              <RefreshCw size={14} />
              Regenerate
            </Button>
            <Button onClick={() => download(detail)}>
              <Download size={14} />
              Download summary
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setSent([...sent, detail.id])
                notify(
                  "Signature request recorded. Connect an e-sign provider to deliver it.",
                )
              }}
            >
              <Send size={14} />
              Send for signature
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}

type Cheque = {
  number: string
  amount: number
  due: string
  bank: string
  status: string
}
function Payments({ notify }: { notify: (value: string) => void }) {
  const [cheques, setCheques] = useState<Cheque[]>([
    {
      number: "000341",
      amount: 31250,
      due: "2026-11-01",
      bank: "Emirates NBD",
      status: "Recorded",
    },
    {
      number: "000342",
      amount: 31250,
      due: "2027-02-01",
      bank: "Emirates NBD",
      status: "Scheduled",
    },
    {
      number: "000343",
      amount: 31250,
      due: "2027-05-01",
      bank: "Emirates NBD",
      status: "Scheduled",
    },
    {
      number: "000344",
      amount: 31250,
      due: "2027-08-01",
      bank: "Emirates NBD",
      status: "Scheduled",
    },
  ])
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<number | null>(null)
  const [draft, setDraft] = useState<Cheque>({
    number: "",
    amount: 0,
    due: "",
    bank: "",
    status: "Scheduled",
  })
  const [error, setError] = useState("")
  const total = cheques.reduce((sum, item) => sum + item.amount, 0)
  const paid = cheques
    .filter((item) => item.status === "Recorded")
    .reduce((sum, item) => sum + item.amount, 0)
  const save = (event: FormEvent) => {
    event.preventDefault()
    if (draft.amount <= 0) {
      setError("Cheque amount must be greater than zero.")
      return
    }
    if (
      cheques.some(
        (item, index) => item.number === draft.number && index !== editing,
      )
    ) {
      setError("This cheque number is already recorded.")
      return
    }
    setCheques((items) =>
      editing === null
        ? [...items, draft]
        : items.map((item, index) => (index === editing ? draft : item)),
    )
    setModal(false)
    notify("Cheque metadata saved. No payment was processed.")
  }
  return (
    <>
      <PageHeader
        title="Payments & Cheques"
        subtitle="Record payment schedules and cheque metadata for each tenancy."
      >
        <Button
          onClick={() =>
            exportFile(
              "cheque-ledger.csv",
              "Cheque,Amount,Due,Bank,Status\n" +
                cheques
                  .map(
                    (item) =>
                      `${item.number},${item.amount},${item.due},${item.bank},${item.status}`,
                  )
                  .join("\n"),
            )
          }
        >
          <Download size={15} />
          Export ledger
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setEditing(null)
            setDraft({
              number: "",
              amount: 0,
              due: "",
              bank: "",
              status: "Scheduled",
            })
            setError("")
            setModal(true)
          }}
        >
          <Plus size={15} />
          Add Cheque
        </Button>
      </PageHeader>
      <div className="mb-5">
        <Alert>
          This system records cheque and transfer metadata only. It does not
          process payments, cash cheques, or verify bank settlement.
        </Alert>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { title: "Annual rent", value: 125000 },
          { title: "Total scheduled", value: total },
          { title: "Paid / recorded", value: paid },
          { title: "Outstanding", value: Math.max(0, 125000 - paid) },
        ].map((item) => (
          <Card key={item.title} className="p-5">
            <p className="text-xs text-muted-foreground">{item.title}</p>
            <p className="mt-3 text-xl font-semibold tabular-nums">
              {money(item.value)}
            </p>
          </Card>
        ))}
      </div>
      {total !== 125000 && (
        <div className="mb-5">
          <Alert type="error">
            Schedule mismatch: cheque amounts total {money(total)} but annual
            rent is AED 125,000. Correct the instalment schedule before final
            validation.
          </Alert>
        </div>
      )}
      <Card>
        <CardHeader
          title="Instalment schedule"
          subtitle="EJR-2026-004531 · Muhammad Ahmed · Unit 1204, Marina Heights"
        >
          <Badge status={total === 125000 ? "Passed" : "Action Needed"} />
        </CardHeader>
        <SimpleTable
          headers={[
            "Instalment",
            "Cheque #",
            "Bank",
            "Amount",
            "Due Date",
            "Status",
            "Actions",
          ]}
          rows={cheques.map((item, index) => [
            String(index + 1).padStart(2, "0"),
            item.number,
            item.bank,
            <span className="font-medium">{money(item.amount)}</span>,
            item.due,
            <Badge status={item.status} />,
            <Button
              variant="ghost"
              onClick={() => {
                setEditing(index)
                setDraft(item)
                setError("")
                setModal(true)
              }}
            >
              Edit <FilePenLine size={14} />
            </Button>,
          ])}
        />
        <div className="flex justify-between border-t border-border p-5 text-xs">
          <span className="text-muted-foreground">
            Security deposit: AED 6,250 · Refundable
          </span>
          <span className="font-semibold">Total: {money(total)}</span>
        </div>
      </Card>
      <Card className="mt-5">
        <CardHeader
          title="Payment ledger"
          subtitle="Recorded events · Not proof of settlement"
        />
        <SimpleTable
          headers={[
            "Recorded",
            "Reference",
            "Payment Mode",
            "Amount",
            "Recorded by",
            "Result",
          ]}
          rows={[
            [
              "12 Oct 2026 · 09:40",
              "CHQ-000341",
              "Cheque metadata",
              "AED 31,250",
              "Leila Mansour · Finance Officer",
              <Badge status="Recorded" />,
            ],
            [
              "12 Oct 2026 · 09:42",
              "DEP-2026-004531",
              "Transfer metadata · Security deposit",
              "AED 6,250",
              "Leila Mansour · Finance Officer",
              <Badge status="Recorded" />,
            ],
          ]}
        />
      </Card>
      {modal && (
        <Modal
          title={
            editing === null ? "Add cheque metadata" : "Edit cheque metadata"
          }
          onClose={() => setModal(false)}
        >
          <form onSubmit={save}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Cheque Number" required>
                <input
                  required
                  value={draft.number}
                  onChange={(event) =>
                    setDraft({ ...draft, number: event.target.value })
                  }
                  className={fieldClass}
                />
              </Field>
              <Field label="Amount (AED)" required>
                <input
                  required
                  min="0.01"
                  step="0.01"
                  type="number"
                  value={draft.amount || ""}
                  onChange={(event) =>
                    setDraft({ ...draft, amount: Number(event.target.value) })
                  }
                  className={fieldClass}
                />
              </Field>
              <Field label="Due Date" required>
                <input
                  required
                  type="date"
                  value={draft.due}
                  onChange={(event) =>
                    setDraft({ ...draft, due: event.target.value })
                  }
                  className={fieldClass}
                />
              </Field>
              <Field label="Bank" required>
                <input
                  required
                  value={draft.bank}
                  onChange={(event) =>
                    setDraft({ ...draft, bank: event.target.value })
                  }
                  className={fieldClass}
                />
              </Field>
              <Field label="Record Status" required>
                <select
                  value={draft.status}
                  onChange={(event) =>
                    setDraft({ ...draft, status: event.target.value })
                  }
                  className={fieldClass}
                >
                  <option>Scheduled</option>
                  <option>Recorded</option>
                  <option>Returned</option>
                  <option>Cancelled</option>
                </select>
              </Field>
            </div>
            {error && (
              <div className="mt-4">
                <Alert type="error">{error}</Alert>
              </div>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <Button onClick={() => setModal(false)}>Cancel</Button>
              <Button variant="primary" type="submit">
                Save Cheque
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

function Integration({
  cases,
  notify,
}: {
  cases: Case[]
  notify: (value: string) => void
}) {
  const [retry, setRetry] = useState(false)
  const [status, setStatus] = useState("Push Failed")
  return (
    <>
      <PageHeader
        title="DLD / Ejari Integration"
        subtitle="Monitor verified payloads, gateway responses, and confirmed registrations."
      >
        <Badge status="Connected" />
        <Button
          onClick={() =>
            notify(
              "Gateway status refreshed. Sample gateway records are displayed.",
            )
          }
        >
          <RefreshCw size={15} />
          Refresh status
        </Button>
      </PageHeader>
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">
            Confirmed registrations · This month
          </p>
          <p className="mt-3 text-3xl font-semibold">214</p>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-700">
            <ShieldCheck size={12} />
            Gateway confirmed only
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Push queue</p>
          <p className="mt-3 text-3xl font-semibold">8</p>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Oldest queued 2 minutes ago
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-xs text-muted-foreground">Requires attention</p>
          <p className="mt-3 text-3xl font-semibold">3</p>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] text-red-700">
            <TriangleAlert size={12} />2 retryable · 1 payload issue
          </p>
        </Card>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Registration confirmed"
            subtitle="EJR-2026-004528 · Unit 506, Park Heights"
          >
            <Badge status="Registered" />
          </CardHeader>
          <div className="px-5 pb-5">
            <GatewayTimeline success />
            <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <DetailRows
                rows={[
                  ["Ejari contract number", "EJ-2026-089214"],
                  ["Gateway reference", "DLD-GW-20261012-00482"],
                  ["Confirmed at", "12 Oct 2026 · 10:42:18 GST"],
                ]}
              />
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">
              Sample confirmed gateway record · Correlation: cor-a82d-19f4
            </p>
          </div>
        </Card>
        <Card>
          <CardHeader
            title="Submission requires attention"
            subtitle="EJR-2026-004525 · Unit 402, Belgravia III"
          >
            <Badge status={status} />
          </CardHeader>
          <div className="px-5 pb-5">
            <GatewayTimeline
              success={false}
              queued={status === "Push Queued"}
            />
            <div className="my-5">
              <Alert type="error">
                <strong>DLD-GW-503 · Gateway temporarily unavailable</strong>
                <br />
                The gateway did not confirm registration. Your case has not been
                registered. The request can be safely retried using the same
                idempotency key.
              </Alert>
            </div>
            <DetailRows
              rows={[
                ["Correlation ID", "cor-7bc3-40ae"],
                ["Attempt", "2 of 5"],
                ["Last response", "12 Oct 2026 · 09:46:02 GST"],
                ["Ejari number", "Not issued"],
              ]}
            />
            <Button
              variant="primary"
              className="mt-5"
              disabled={status === "Push Queued"}
              onClick={() => setRetry(true)}
            >
              <RefreshCw size={14} />
              Retry submission
            </Button>
          </div>
        </Card>
      </div>
      <Card className="mt-5">
        <CardHeader title="Recent gateway submissions" />
        <SimpleTable
          headers={[
            "Case",
            "Payload",
            "Push status",
            "Gateway reference",
            "Ejari number",
          ]}
          rows={cases
            .filter((item) =>
              ["Registered", "Ready to Push", "Push Failed"].includes(
                item.status,
              ),
            )
            .map((item) => [
              item.id,
              <Badge status="Passed" />,
              <Badge status={item.status} />,
              item.status === "Registered"
                ? "DLD-GW-20261012-00482"
                : "Awaiting response",
              item.status === "Registered" ? "EJ-2026-089214" : "Not issued",
            ])}
        />
      </Card>
      {retry && (
        <Modal title="Retry DLD submission?" onClose={() => setRetry(false)}>
          <Alert type="warning">
            This demo queues a retry without calling the live DLD gateway. No
            registration will be marked successful without a gateway
            confirmation.
          </Alert>
          <p className="mt-4 text-xs text-muted-foreground">
            Case: EJR-2026-004525
            <br />
            Idempotency key: ejr-004525-v1
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <Button onClick={() => setRetry(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                setStatus("Push Queued")
                setRetry(false)
                notify(
                  "Retry queued locally. Live submission requires a configured gateway.",
                )
              }}
            >
              Queue retry <Send size={14} />
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
function PushDemo({
  onClose,
  onStatus,
}: {
  onClose: () => void
  onStatus: (status: string) => void
}) {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const sending = setTimeout(() => {
      setStage(1)
      onStatus("Push In Progress")
    }, 800)
    const result = setTimeout(() => {
      setStage(2)
      onStatus("Push Failed")
    }, 2200)
    return () => {
      clearTimeout(sending)
      clearTimeout(result)
    }
  }, [])
  return (
    <Modal title="DLD submission · Sandbox preview" onClose={onClose}>
      <div className="mb-5">
        <Alert>
          No live gateway request is sent. This preview demonstrates a safe
          failure path without inventing a successful registration.
        </Alert>
      </div>
      <div className="space-y-4">
        {[
          "Verified payload queued",
          "Sending to gateway",
          "Gateway response",
        ].map((label, index) => (
          <div key={label} className="flex items-center gap-3 text-xs">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full ${
                index < stage
                  ? "bg-emerald-50 text-emerald-600"
                  : index === stage && stage < 2
                    ? "bg-blue-50 text-primary"
                    : stage === 2 && index === 2
                      ? "bg-red-50 text-red-600"
                      : "bg-slate-100 text-muted-foreground"
              }`}
            >
              {index < stage ? (
                <Check size={15} />
              ) : stage === 2 && index === 2 ? (
                <X size={15} />
              ) : index === stage ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <Clock3 size={15} />
              )}
            </span>
            {label}
          </div>
        ))}
      </div>
      {stage === 2 && (
        <div className="mt-5">
          <Alert type="error">
            <strong>Push Failed · DEMO-GW-NOT-CONNECTED</strong>
            <br />A live gateway is not configured. No Ejari contract number was
            issued.
            <br />
            Correlation: demo-cor-20261012
          </Alert>
        </div>
      )}
      <div className="mt-5 flex justify-end">
        <Button onClick={onClose}>
          {stage < 2 ? "Close preview" : "Close"}
        </Button>
      </div>
    </Modal>
  )
}
function GatewayTimeline({
  success,
  queued = false,
}: {
  success: boolean
  queued?: boolean
}) {
  return (
    <div className="space-y-4">
      {[
        "Payload validated",
        "Queued",
        "Sending to gateway",
        "Gateway response",
        "Ejari registration",
      ].map((label, index) => (
        <div key={label} className="flex items-center gap-3">
          <span
            className={`grid h-6 w-6 place-items-center rounded-full ${
              success || index < (queued ? 2 : 3)
                ? "bg-emerald-100 text-emerald-700"
                : index === 3 && !queued
                  ? "bg-red-100 text-red-700"
                  : "bg-slate-100 text-muted-foreground"
            }`}
          >
            {success || index < (queued ? 2 : 3) ? (
              <Check size={12} />
            ) : index === 3 && !queued ? (
              <X size={12} />
            ) : (
              <Clock3 size={12} />
            )}
          </span>
          <span className="flex-1 text-[11px]">{label}</span>
          <span className="text-[9px] text-muted-foreground">
            {success
              ? "Confirmed"
              : index === 3 && !queued
                ? "503 · Failed"
                : index > 1 && queued
                  ? "Pending"
                  : index === 4
                    ? "Not registered"
                    : "Complete"}
          </span>
        </div>
      ))}
    </div>
  )
}

const notificationData = [
  {
    category: "Documents",
    title: "Emirates ID needs a clearer scan",
    description:
      "Muhammad Ahmed’s Emirates ID has an unreadable expiry date. Request a new upload for EJR-2026-004531.",
    time: "12 minutes ago",
    icon: FileSearch,
  },
  {
    category: "DLD",
    title: "DLD gateway submission failed",
    description:
      "EJR-2026-004525 received DLD-GW-503. No registration was issued. Retry is available.",
    time: "1 hour ago",
    icon: ShieldAlert,
  },
  {
    category: "Intake",
    title: "Intake link expires soon",
    description:
      "James Wilson’s secure intake link expires today at 16:00 GST. Two documents are still missing.",
    time: "2 hours ago",
    icon: Link2,
  },
  {
    category: "Signature",
    title: "Tenant signature pending",
    description:
      "Sofia Martinez has not yet signed the tenancy agreement for Creek Horizon, Unit 1107.",
    time: "2 hours ago",
    icon: FilePenLine,
  },
  {
    category: "Validation",
    title: "Case ready for final validation",
    description:
      "All required documents for Priya Sharma’s renewal have been submitted.",
    time: "3 hours ago",
    icon: ShieldCheck,
  },
  {
    category: "System",
    title: "Gateway credentials rotate in 14 days",
    description:
      "Ask your agency administrator to review the scheduled DLD integration credential renewal.",
    time: "Today, 08:00",
    icon: Settings2,
  },
]
function Notifications() {
  const [category, setCategory] = useState("All")
  const [read, setRead] = useState<number[]>([])
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={`${notificationData.length - read.length} unread notifications across your workspace.`}
      >
        <Button
          onClick={() => setRead(notificationData.map((_, index) => index))}
        >
          <CheckCheck size={15} />
          Mark all as read
        </Button>
      </PageHeader>
      <div className="mb-5 flex flex-wrap gap-2">
        {[
          "All",
          "Intake",
          "Documents",
          "Validation",
          "Signature",
          "DLD",
          "System",
        ].map((value) => (
          <Button
            key={value}
            variant={category === value ? "primary" : "secondary"}
            onClick={() => setCategory(value)}
          >
            {value}
          </Button>
        ))}
      </div>
      <Card>
        <div className="divide-y divide-border">
          {notificationData.map(
            (item, index) =>
              (category === "All" || category === item.category) && (
                <button
                  key={item.title}
                  onClick={() =>
                    setRead((values) =>
                      values.includes(index)
                        ? values.filter((value) => value !== index)
                        : [...values, index],
                    )
                  }
                  className={`flex w-full items-start gap-4 p-5 text-start ${
                    !read.includes(index) ? "bg-blue-50/25" : ""
                  }`}
                >
                  <span className="rounded-xl bg-slate-100 p-3 text-slate-500">
                    <item.icon size={19} />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 text-xs font-semibold">
                      {item.title}
                      {!read.includes(index) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </span>
                    <span className="mt-2 block max-w-3xl text-[11px] leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                    <span className="mt-2 block text-[10px] text-muted-foreground">
                      {item.category} · {item.time} ·{" "}
                      {read.includes(index) ? "Read" : "Unread"}
                    </span>
                  </span>
                  <CheckCheck
                    size={15}
                    className={
                      read.includes(index) ? "text-primary" : "text-slate-300"
                    }
                  />
                </button>
              ),
          )}
        </div>
      </Card>
    </>
  )
}
function Reports({ cases }: { cases: Case[] }) {
  const [range, setRange] = useState("This month")
  const reportRows = [
    ["Transaction volume", "203 cases", "+18.2%"],
    ["Average processing time", "2.4 days", "−12.0%"],
    ["Intake completion rate", "78.4%", "+6.1%"],
    ["Document rejection rate", "4.1%", "−1.8%"],
    ["Validation failures", "12 cases", "−4 cases"],
    ["DLD push success rate", "98.6%", "+0.4%"],
    ["Agency throughput", "51 cases / week", "+8 cases"],
  ]
  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Operational performance, processing efficiency, and registration outcomes."
      >
        <select
          aria-label="Report date range"
          className={`${fieldClass} w-auto`}
          value={range}
          onChange={(event) => setRange(event.target.value)}
        >
          <option>This month</option>
          <option>Last month</option>
          <option>This quarter</option>
        </select>
        <Button
          onClick={() =>
            exportFile(
              "agency-operations-report.csv",
              "Metric,Value,Change\n" +
                reportRows.map((row) => row.join(",")).join("\n"),
            )
          }
        >
          <Download size={15} />
          Export Report
        </Button>
      </PageHeader>
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            title: "Transactions",
            value:
              range === "Last month"
                ? "172"
                : range === "This quarter"
                  ? "582"
                  : "203",
            change: "+18.2%",
          },
          {
            title: "Average processing",
            value: "2.4 days",
            change: "12% faster",
          },
          { title: "Intake completion", value: "78.4%", change: "+6.1%" },
          { title: "DLD success", value: "98.6%", change: "+0.4%" },
        ].map((item) => (
          <Card key={item.title} className="p-5">
            <p className="text-xs text-muted-foreground">{item.title}</p>
            <p className="mt-3 text-2xl font-semibold">{item.value}</p>
            <p className="mt-3 text-[10px] text-emerald-700">
              <TrendingUp size={12} className="me-1 inline" />
              {item.change} vs. previous period
            </p>
          </Card>
        ))}
      </div>
      <div className="mb-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Weekly transaction volume"
            subtitle="New cases and renewals"
          />
          <VolumeChart reports />
        </Card>
        <Card>
          <CardHeader
            title="Registration success / failure"
            subtitle="Gateway-confirmed outcomes only"
          />
          <div className="h-[260px] px-4" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { week: "Week 1", success: 51, failed: 2 },
                  { week: "Week 2", success: 58, failed: 1 },
                  { week: "Week 3", success: 48, failed: 2 },
                  { week: "Week 4", success: 57, failed: 1 },
                ]}
              >
                <CartesianGrid
                  stroke="#e8edf3"
                  vertical={false}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar
                  dataKey="success"
                  name="Registered"
                  stackId="a"
                  fill="#71b9a2"
                />
                <Bar
                  dataKey="failed"
                  name="Failed"
                  stackId="a"
                  fill="#cc7979"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-5 py-3 text-[10px] text-muted-foreground">
            <span>■ Registered</span>
            <span>▨ Failed</span>
          </div>
        </Card>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Operational metrics"
            subtitle={`Sample operational report · ${range}`}
          />
          <SimpleTable
            headers={["Metric", "Value", "Change"]}
            rows={reportRows}
          />
        </Card>
        <Card>
          <CardHeader
            title="Broker performance"
            subtitle="Completed cases and processing efficiency"
          />
          <SimpleTable
            headers={["Broker", "Active", "Registered", "Avg. processing"]}
            rows={[
              ["Sara Al Hashimi", "42", "76", "2.1 days"],
              ["Omar Hassan", "38", "71", "2.5 days"],
              ["Rami Khalil", "48", "67", "2.6 days"],
            ]}
          />
          <div className="p-5">
            <Button onClick={() => exportCases(cases)}>
              Export underlying transactions <ArrowDownToLine size={14} />
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

const auditEvents = [
  {
    time: "12 Oct 2026, 10:42:18",
    actor: "DLD Gateway",
    action: "Registration confirmed",
    entity: "Ejari Registration",
    case: "EJR-2026-004528",
    ip: "Gateway service",
    result: "Passed",
  },
  {
    time: "12 Oct 2026, 10:38:02",
    actor: "Mariam Saeed",
    action: "Document accepted",
    entity: "Passport · v1",
    case: "EJR-2026-004531",
    ip: "192.0.2.84",
    result: "Accepted",
  },
  {
    time: "12 Oct 2026, 10:32:46",
    actor: "Mariam Saeed",
    action: "Rework requested",
    entity: "Emirates ID · v2",
    case: "EJR-2026-004531",
    ip: "192.0.2.84",
    result: "Action Needed",
  },
  {
    time: "12 Oct 2026, 10:26:10",
    actor: "Priya Sharma",
    action: "Intake submitted",
    entity: "Tenant Intake",
    case: "EJR-2026-004530",
    ip: "198.51.100.32",
    result: "Submitted",
  },
  {
    time: "12 Oct 2026, 09:46:02",
    actor: "DLD Gateway",
    action: "Push failed",
    entity: "Gateway Request",
    case: "EJR-2026-004525",
    ip: "Gateway service",
    result: "Push Failed",
  },
]
function Audit() {
  const [query, setQuery] = useState("")
  const [actor, setActor] = useState("All actors")
  const [action, setAction] = useState("All actions")
  const [date, setDate] = useState("")
  const [severity, setSeverity] = useState("All severities")
  const [detail, setDetail] = useState<typeof auditEvents[number] | null>(null)
  return (
    <>
      <PageHeader
        title="Audit Trail"
        subtitle="An immutable record of case activity, decisions, and gateway events."
      >
        <Button
          onClick={() =>
            exportFile(
              "audit-trail.csv",
              "Timestamp,Actor,Action,Entity,Case,IP,Result\n" +
                auditEvents
                  .map((event) =>
                    Object.values(event)
                      .map((value) => `"${value}"`)
                      .join(","),
                  )
                  .join("\n"),
            )
          }
        >
          <Download size={15} />
          Export Log
        </Button>
      </PageHeader>
      <div className="mb-5">
        <Alert>
          Audit records are read-only. Original values, reasons, actors,
          timestamps, and correlation IDs are retained for compliance.
        </Alert>
      </div>
      <Card>
        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-5">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Case ID or action…"
            aria-label="Search audit trail"
            className={fieldClass}
          />
          <select
            className={fieldClass}
            value={actor}
            onChange={(event) => setActor(event.target.value)}
            aria-label="Actor filter"
          >
            <option>All actors</option>
            <option>Mariam Saeed</option>
            <option>DLD Gateway</option>
            <option>Priya Sharma</option>
          </select>
          <select
            className={fieldClass}
            aria-label="Action filter"
            value={action}
            onChange={(event) => setAction(event.target.value)}
          >
            <option>All actions</option>
            <option>Document accepted</option>
            <option>Rework requested</option>
          </select>
          <input
            type="date"
            className={fieldClass}
            aria-label="Audit date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <select
            className={fieldClass}
            aria-label="Severity filter"
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
          >
            <option>All severities</option>
            <option>Info</option>
            <option>Warning</option>
            <option>Error</option>
          </select>
        </div>
        <SimpleTable
          headers={[
            "Timestamp (GST)",
            "Actor",
            "Action",
            "Entity",
            "Case",
            "IP Address",
            "Result",
            "",
          ]}
          rows={auditEvents
            .filter(
              (event) =>
                Object.values(event)
                  .join(" ")
                  .toLowerCase()
                  .includes(query.toLowerCase()) &&
                (actor === "All actors" || event.actor === actor) &&
                (action === "All actions" || event.action === action) &&
                (!date || date === "2026-10-12") &&
                (severity === "All severities" ||
                  (severity === "Error"
                    ? event.result === "Push Failed"
                    : severity === "Warning"
                      ? event.result === "Action Needed"
                      : !["Push Failed", "Action Needed"].includes(
                          event.result,
                        ))),
            )
            .map((event) => [
              <span className="whitespace-nowrap text-[10px]">
                {event.time}
              </span>,
              event.actor,
              event.action,
              event.entity,
              <span className="text-primary">{event.case}</span>,
              <span className="whitespace-nowrap text-[10px]">{event.ip}</span>,
              <Badge status={event.result} />,
              <IconButton
                icon={ChevronRight}
                label="View audit event"
                onClick={() => setDetail(event)}
              />,
            ])}
        />
      </Card>
      {detail && (
        <Modal title="Audit event detail" onClose={() => setDetail(null)}>
          <DetailRows
            rows={[
              ["Actor", detail.actor],
              ["Action", detail.action],
              ["Timestamp", detail.time + " GST"],
              ["Case", detail.case],
              ["IP address", detail.ip],
              ["Correlation ID", "cor-a82d-19f4"],
            ]}
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-slate-50 p-4">
              <h4 className="text-xs font-semibold">Before</h4>
              <pre className="mt-3 whitespace-pre-wrap text-[10px] text-muted-foreground">
                {JSON.stringify(
                  { status: "Validation", document_version: 2 },
                  null,
                  2,
                )}
              </pre>
            </div>
            <div className="rounded-lg border border-border bg-slate-50 p-4">
              <h4 className="text-xs font-semibold">After</h4>
              <pre className="mt-3 whitespace-pre-wrap text-[10px] text-muted-foreground">
                {JSON.stringify(
                  { status: detail.result, document_version: 2 },
                  null,
                  2,
                )}
              </pre>
            </div>
          </div>
          <div className="mt-4">
            <Alert>
              Reason:{" "}
              {detail.action === "Rework requested"
                ? "Expiry date was unreadable; replacement requested."
                : detail.action === "Registration confirmed"
                  ? "Verified gateway response received."
                  : "Case activity recorded during operational review."}
            </Alert>
          </div>
        </Modal>
      )}
    </>
  )
}

const roleList = [
  "Super Admin",
  "Agency Admin",
  "Compliance Officer",
  "Document Controller",
  "Senior Broker / Team Lead",
  "Broker / Agent",
  "Finance Officer",
  "Read-Only Auditor",
  "Support Agent",
]
function Administration({ notify }: { notify: (text: string) => void }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState("Agency Profile")
  const [role, setRole] = useState("Agency Admin")
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    "View all agency cases": true,
    "Create transactions": true,
    "Edit case details": true,
    "Validate documents": true,
    "Manage cheque metadata": false,
    "Push verified cases to DLD": true,
    "Manage users and roles": true,
    "View immutable audit trail": true,
  })
  const [addUser, setAddUser] = useState(false)
  const [users, setUsers] = useState([
    {
      name: "Sara Al Hashimi",
      email: "sara@horizon.example",
      role: "Agency Admin",
      status: "Active",
      active: "Now",
    },
    {
      name: "Mariam Saeed",
      email: "mariam@horizon.example",
      role: "Document Controller",
      status: "Active",
      active: "12 minutes ago",
    },
    {
      name: "Leila Mansour",
      email: "leila@horizon.example",
      role: "Finance Officer",
      status: "Active",
      active: "1 hour ago",
    },
    {
      name: "Omar Hassan",
      email: "omar@horizon.example",
      role: "Broker / Agent",
      status: "Active",
      active: "28 minutes ago",
    },
    {
      name: "Rashid Abdullah",
      email: "rashid@horizon.example",
      role: "Read-Only Auditor",
      status: "Active",
      active: "Yesterday",
    },
  ])
  return (
    <>
      <PageHeader
        title="Administration"
        subtitle="Agency configuration, user access, and operational governance."
      >
        <Button onClick={() => navigate("/states")}>
          <SlidersHorizontal size={15} />
          Interface states
        </Button>
        <Badge status="Active" />
      </PageHeader>
      <div className="grid gap-5 lg:grid-cols-[210px_1fr]">
        <Card className="self-start p-2">
          <nav aria-label="Administration settings">
            {[
              "Agency Profile",
              "Users & Roles",
              "Permissions",
              "Notification Templates",
              "Rule Engine",
              "Integration Credentials",
              "Branding",
              "Configuration",
              "Security",
            ].map((value) => (
              <button
                onClick={() => setTab(value)}
                key={value}
                className={`min-h-11 w-full rounded-lg px-3 text-start text-xs ${
                  tab === value
                    ? "bg-blue-50 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-slate-50"
                }`}
              >
                {value}
              </button>
            ))}
          </nav>
        </Card>
        <Card>
          <CardHeader
            title={tab}
            subtitle={
              tab === "Integration Credentials"
                ? "Credentials are stored server-side and never exposed to clients."
                : "Manage your agency workspace settings."
            }
          />
          {tab === "Users & Roles" ? (
            <>
              <div className="px-5 pb-4">
                <Button variant="primary" onClick={() => setAddUser(true)}>
                  <Plus size={14} />
                  Invite User
                </Button>
              </div>
              <SimpleTable
                headers={[
                  "Name",
                  "Email",
                  "Role",
                  "Status",
                  "Last Active",
                  "Actions",
                ]}
                rows={users.map((user, index) => [
                  <span className="font-medium">{user.name}</span>,
                  user.email,
                  <select
                    aria-label={`Role for ${user.name}`}
                    value={user.role}
                    onChange={(event) =>
                      setUsers((items) =>
                        items.map((item, i) =>
                          i === index
                            ? { ...item, role: event.target.value }
                            : item,
                        ),
                      )
                    }
                    className="max-w-40 rounded-lg border border-border px-2 py-2 text-[10px]"
                  >
                    {roleList.map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>,
                  <Badge status={user.status} />,
                  user.active,
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setUsers((items) =>
                        items.map((item, i) =>
                          i === index
                            ? {
                                ...item,
                                status:
                                  item.status === "Active"
                                    ? "Inactive"
                                    : "Active",
                              }
                            : item,
                        ),
                      )
                      notify("User access status updated locally.")
                    }}
                  >
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </Button>,
                ])}
              />
            </>
          ) : tab === "Permissions" ? (
            <div className="px-5 pb-5">
              <label className="mb-5 block text-xs font-medium">
                Role
                <select
                  value={role}
                  onChange={(event) => {
                    setRole(event.target.value)
                    const readOnly = event.target.value === "Read-Only Auditor"
                    setPermissions(
                      Object.fromEntries(
                        Object.keys(permissions).map((key) => [
                          key,
                          readOnly
                            ? key.startsWith("View")
                            : key !== "Manage cheque metadata",
                        ]),
                      ),
                    )
                  }}
                  className={`${fieldClass} mt-2`}
                >
                  {roleList.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
              <div className="divide-y divide-border">
                {Object.entries(permissions).map(([label, enabled]) => (
                  <label
                    key={label}
                    className="flex min-h-14 items-center justify-between gap-3 text-xs"
                  >
                    <span>{label}</span>
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(event) =>
                        setPermissions({
                          ...permissions,
                          [label]: event.target.checked,
                        })
                      }
                      className="h-4 w-4 accent-primary"
                    />
                  </label>
                ))}
              </div>
              <Alert>
                Permissions are scoped to the current agency. Production
                authorization must also be enforced by the server.
              </Alert>
              <Button
                variant="primary"
                className="mt-4"
                onClick={() =>
                  notify(`Permission configuration for ${role} saved locally.`)
                }
              >
                Save Permissions
              </Button>
            </div>
          ) : tab === "Notification Templates" ? (
            <div className="space-y-5 px-5 pb-5">
              <Field label="Template" required>
                <select className={fieldClass}>
                  <option>Client intake invitation</option>
                  <option>Document rework request</option>
                  <option>Signature reminder</option>
                  <option>Registration confirmed</option>
                </select>
              </Field>
              <Field label="Channel" required>
                <select className={fieldClass}>
                  <option>WhatsApp</option>
                  <option>SMS</option>
                  <option>Email</option>
                </select>
              </Field>
              <Field label="Message" required>
                <textarea
                  rows={5}
                  className={fieldClass}
                  defaultValue="Hello {{client_name}}, please securely provide your documents for {{property}}. Your case reference is {{case_id}}. Open your secure intake link: {{intake_url}}. This link expires in 48 hours."
                />
              </Field>
              <p className="text-[10px] text-muted-foreground">
                Allowed variables: client_name, property, case_id, intake_url,
                expiry
              </p>
              <Button
                variant="primary"
                onClick={() => notify("Notification template saved locally.")}
              >
                Save Template
              </Button>
            </div>
          ) : tab === "Rule Engine" ? (
            <div className="px-5 pb-5">
              <SimpleTable
                headers={["Rule", "Severity", "Status"]}
                rows={[
                  [
                    "Passport must be valid at contract start",
                    <Badge status="Hard Block" />,
                    <Badge status="Active" />,
                  ],
                  [
                    "OCR confidence below 90% requires review",
                    <Badge status="Hard Block" />,
                    <Badge status="Active" />,
                  ],
                  [
                    "Name spelling mismatch",
                    <Badge status="Warning" />,
                    <Badge status="Active" />,
                  ],
                  [
                    "Cheque schedule equals annual rent",
                    <Badge status="Hard Block" />,
                    <Badge status="Active" />,
                  ],
                  [
                    "Both parties sign tenancy contract",
                    <Badge status="Hard Block" />,
                    <Badge status="Active" />,
                  ],
                ]}
              />
              <div className="mt-4">
                <Alert>
                  Rule changes require a compliance officer review and are
                  recorded in the audit trail.
                </Alert>
              </div>
            </div>
          ) : tab === "Integration Credentials" ? (
            <div className="space-y-5 px-5 pb-5">
              <Alert type="warning">
                Demo mode. No live DLD credentials or production gateway
                connection are configured.
              </Alert>
              <DetailRows
                rows={[
                  ["Environment", "Sandbox / Demo"],
                  ["Gateway endpoint", "Not configured"],
                  ["Credential reference", "Server-side secret required"],
                  ["Last rotation", "Not available"],
                ]}
              />
              <Button
                onClick={() =>
                  notify(
                    "A secure server environment is required before connecting DLD credentials.",
                  )
                }
              >
                <LockKeyhole size={15} />
                Configure secure connection
              </Button>
            </div>
          ) : tab === "Security" ? (
            <div className="space-y-5 px-5 pb-5">
              <Alert>
                Client sessions use secure tokens and OTP verification. Internal
                users require role-scoped access.
              </Alert>
              {[
                "Require MFA for internal users",
                "Expire idle sessions after 30 minutes",
                "Enforce client OTP verification",
                "Retain immutable audit records",
              ].map((label) => (
                <label
                  className="flex min-h-11 items-center justify-between text-xs"
                  key={label}
                >
                  {label}
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-primary"
                  />
                </label>
              ))}
              <Button
                variant="primary"
                onClick={() =>
                  notify(
                    "Security preferences recorded locally. Server enforcement is required.",
                  )
                }
              >
                Save Security Settings
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                notify(`${tab} settings saved locally.`)
              }}
              className="space-y-5 px-5 pb-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {(tab === "Agency Profile"
                  ? [
                      ["Agency Name", "Horizon Properties"],
                      ["RERA ORN", "28476"],
                      ["Trade License", "TL-DXB-2026-78123"],
                      ["Contact Email", "operations@horizon.example"],
                      ["Contact Number", "+971 4 555 0123"],
                      ["Office Address", "Office 604, Marina Plaza, Dubai"],
                    ]
                  : tab === "Branding"
                    ? [
                        ["Agency Display Name", "Horizon Properties"],
                        ["Primary Colour", "#2959D8"],
                        [
                          "Intake Welcome Text",
                          "Your tenancy documents, made simple.",
                        ],
                      ]
                    : [
                        ["Default Intake Expiry (hours)", "48"],
                        ["OTP Validity (minutes)", "5"],
                        ["Default Language", "English"],
                        ["Timezone", "Asia/Dubai"],
                        ["Maximum Upload Size (MB)", "10"],
                      ]
                ).map(([label, value]) => (
                  <Field label={label} required key={label}>
                    <input
                      required
                      className={fieldClass}
                      defaultValue={value}
                    />
                  </Field>
                ))}
              </div>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          )}
        </Card>
      </div>
      {addUser && (
        <Modal title="Invite agency user" onClose={() => setAddUser(false)}>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              setUsers([
                ...users,
                {
                  name: String(data.get("name")),
                  email: String(data.get("email")),
                  role: String(data.get("role")),
                  status: "Pending",
                  active: "Not yet active",
                },
              ])
              setAddUser(false)
              notify(
                "User invitation recorded. Connect email delivery to send the invitation.",
              )
            }}
            className="space-y-4"
          >
            <Field label="Full Name" required>
              <input name="name" required className={fieldClass} />
            </Field>
            <Field label="Email" required>
              <input
                name="email"
                type="email"
                required
                className={fieldClass}
              />
            </Field>
            <Field label="Role" required>
              <select name="role" className={fieldClass}>
                {roleList.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </Field>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setAddUser(false)}>Cancel</Button>
              <Button type="submit" variant="primary">
                Invite User <Send size={14} />
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

type IntakeDocument = {
  name: string
  status: string
  description: string
}
function IntakePortal() {
  const { token } = useParams()
  const navigate = useNavigate()
  const isLandlord =
    new URLSearchParams(useLocation().search).get("party") === "landlord"
  const [step, setStep] = useState(0)
  const [rtl, setRtl] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(30)
  const [name, setName] = useState(
    isLandlord ? "Khalid Al Mansoori" : "Muhammad Ahmed",
  )
  const [email, setEmail] = useState(
    isLandlord ? "khalid.almansoori@example.com" : "muhammad.ahmed@example.com",
  )
  const [docs, setDocs] = useState<IntakeDocument[]>([
    {
      name: "Passport",
      status: "Done",
      description: "Photo and identity page",
    },
    {
      name: "Emirates ID",
      status: "Action Needed",
      description: "Front and back · Clear expiry date",
    },
    {
      name: isLandlord ? "Ownership Proof" : "Residence Visa",
      status: "Not started",
      description: isLandlord
        ? "Ownership details matching the title deed"
        : "Valid UAE residence visa",
    },
    {
      name: "Title Deed",
      status: "Done",
      description: "Property ownership document",
    },
    {
      name: "Signed Tenancy Contract",
      status: "Done",
      description: "Signed by tenant and landlord",
    },
    {
      name: isLandlord ? "Power of Attorney" : "Payment / Cheque Copy",
      status: isLandlord ? "Not applicable" : "Not started",
      description: isLandlord
        ? "Only if represented by a POA"
        : "Clear copy of the cheque or transfer record",
    },
  ])
  const [activeDoc, setActiveDoc] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")
  const [processing, setProcessing] = useState(false)
  const [camera, setCamera] = useState(false)
  const [trueConsent, setTrueConsent] = useState(false)
  const [dataConsent, setDataConsent] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [expiry, setExpiry] = useState("2028-08-12")
  const [documentNumber, setDocumentNumber] = useState("A1234567")
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const done = docs.filter((doc) =>
    ["Done", "Not applicable"].includes(doc.status),
  ).length
  useEffect(() => {
    if (step !== 1 || countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [step, countdown])
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])
  const pickFile = (selected?: File) => {
    if (!selected) return
    if (selected.size > 10 * 1024 * 1024) {
      setError("This file is too large. Please select a file under 10 MB.")
      return
    }
    if (
      !["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(
        selected.type,
      )
    ) {
      setError("Please choose a PDF, JPG, PNG, or WEBP document.")
      return
    }
    setFile(selected)
    setPreview(
      selected.type.startsWith("image/") ? URL.createObjectURL(selected) : "",
    )
    setError("")
    setCamera(false)
  }
  const titles = [
    "Your tenancy documents,\nmade simple.",
    "Verify your mobile number",
    "Confirm your details",
    "Your document checklist",
    `Upload your ${docs[activeDoc].name.toLowerCase()}`,
    "Check your document details",
    "Your payment schedule",
    "Review & submit",
    "You’re all done.",
  ]
  if (token === "expired" || token === "revoked")
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background p-5">
        <Card className="w-full max-w-md p-7">
          <div className="mb-5 inline-flex rounded-full bg-amber-50 p-4 text-amber-700">
            <LockKeyhole size={30} />
          </div>
          <h1 className="text-2xl font-semibold">
            {token === "expired"
              ? "This link has expired"
              : "This link has been revoked"}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your documents are safe. Please contact Horizon Properties to
            request a new secure link for your tenancy case.
          </p>
          <a
            href="mailto:operations@horizon.example"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white"
          >
            <Mail size={16} />
            Contact your agency
          </a>
          <p className="mt-5 text-xs text-muted-foreground">
            Reference: EJR-2026-004531
          </p>
        </Card>
      </div>
    )
  const next = () => {
    setError("")
    if (step === 0) setStep(1)
    else if (step === 1) {
      if (otp.join("") !== "123456")
        setError("That code isn’t correct. Use 123456 for this demo session.")
      else setStep(2)
    } else if (step === 2) {
      if (!name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
        setError("Please enter your full name and a valid email address.")
      else setStep(3)
    } else if (step === 3) {
      if (done !== docs.length)
        setError(
          `Please complete the remaining ${docs.length - done} required documents before continuing.`,
        )
      else setStep(6)
    } else if (step === 4) {
      if (!file) {
        setError("Please choose a document first.")
        return
      }
      setProcessing(true)
      setTimeout(() => {
        setProcessing(false)
        setStep(5)
      }, 1000)
    } else if (step === 5) {
      if (!name.trim() || !documentNumber.trim() || !expiry)
        setError("Please fill in all document details.")
      else {
        setDocs((items) =>
          items.map((doc, index) =>
            index === activeDoc ? { ...doc, status: "Done" } : doc,
          ),
        )
        setFile(null)
        setStep(3)
      }
    } else if (step === 6) setStep(7)
    else if (step === 7) {
      if (!trueConsent || !dataConsent)
        setError("Please confirm both required declarations to submit.")
      else setStep(8)
    }
  }
  const back = () => {
    setError("")
    if (step === 4 || step === 5) setStep(3)
    else if (step === 6) setStep(3)
    else if (step === 7) setStep(6)
    else setStep(Math.max(0, step - 1))
  }
  return (
    <div dir={rtl ? "rtl" : "ltr"} className="min-h-dvh bg-[#f5f7fa]">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-[#172c4d] px-4 py-2 text-[10px] text-white">
        <button
          className="flex min-h-8 items-center gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={13} />
          Agency workspace
        </button>
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={12} />
          Client portal · Demo
        </span>
      </div>
      <div className="mx-auto flex min-h-[calc(100dvh-49px)] max-w-[520px] flex-col bg-white shadow-[0_0_40px_rgba(20,40,70,0.025)]">
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#172c4d] text-white">
              <Building2 size={21} />
            </span>
            <div>
              <p className="text-xs font-bold">
                HORIZON
                <span className="font-medium text-muted-foreground">
                  {" "}
                  PROPERTIES
                </span>
              </p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">
                {isLandlord ? "Secure landlord intake" : "Secure tenant intake"}
              </p>
            </div>
          </div>
          <button
            aria-label="Change language"
            onClick={() => setRtl(!rtl)}
            className="flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs text-muted-foreground"
          >
            <Globe2 size={15} />
            {rtl ? "EN" : "العربية"}
          </button>
        </header>
        {step > 0 && step < 8 && (
          <div className="px-6 pt-5">
            <div className="mb-3 flex justify-between text-[10px]">
              <span className="text-muted-foreground">
                {step <= 2
                  ? "Verify & confirm"
                  : step <= 5
                    ? "Provide documents"
                    : "Review & submit"}
              </span>
              <span className="font-medium">
                Step {step <= 2 ? 1 : step <= 5 ? 2 : 3} of 3
              </span>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((value) => (
                <div
                  key={value}
                  className={`h-1 flex-1 rounded-full ${
                    (step <= 2 ? 1 : step <= 5 ? 2 : 3) >= value
                      ? "bg-primary"
                      : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        <main className="flex-1 px-6 py-7 pb-8">
          {step > 0 && step < 8 && (
            <button
              onClick={back}
              className="mb-4 flex min-h-11 items-center gap-1.5 text-xs text-muted-foreground"
            >
              <ArrowLeft size={15} />
              Back
            </button>
          )}
          {(step === 0 || step === 8) && (
            <span
              className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${
                step === 8
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-blue-50 text-primary"
              }`}
            >
              {step === 8 ? (
                <CircleCheck size={32} />
              ) : (
                <FileCheck2 size={30} strokeWidth={1.6} />
              )}
            </span>
          )}
          <h1 className="whitespace-pre-line text-[26px] font-semibold leading-[1.3] tracking-[-0.4px]">
            {rtl
              ? ({
                  0: "مستندات إيجارك، بكل سهولة.",
                  1: "تحقق من رقم هاتفك",
                  2: "أكد بياناتك",
                  3: "قائمة المستندات",
                  7: "مراجعة وإرسال",
                  8: "تم إرسال مستنداتك.",
                } as Record<number, string>)[step] || titles[step]
              : titles[step]}
          </h1>
          {step === 0 && (
            <>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                You’re providing documents for
                <br />
                <strong className="font-semibold text-foreground">
                  Unit 1204, Marina Heights.
                </strong>
              </p>
              <div className="mt-6 space-y-4 rounded-xl border border-border bg-slate-50/60 p-5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Your case reference
                  </span>
                  <bdi className="font-semibold">EJR-2026-004531</bdi>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock3 size={15} />
                  Takes about 5–8 minutes
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Smartphone size={15} />
                  No account or password needed
                </div>
              </div>
              <div className="mt-7 flex items-start gap-3">
                <LockKeyhole
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Your documents are shared only with your agency for tenancy
                  verification and Dubai Land Department registration. Your
                  agency handles your personal data according to its privacy
                  policy.
                </p>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Enter the 6-digit code sent to
                <br />
                <bdi className="font-semibold text-foreground">
                  {isLandlord ? "+971 5•••••543" : "+971 5•••••234"}
                </bdi>
              </p>
              <div
                className="-mx-2 mt-7 grid grid-cols-6 gap-1 sm:mx-0 sm:gap-2"
                dir="ltr"
                onPaste={(event) => {
                  event.preventDefault()
                  const digits = event.clipboardData
                    .getData("text")
                    .replace(/\D/g, "")
                    .slice(0, 6)
                    .split("")
                  setOtp(
                    Array.from(
                      { length: 6 },
                      (_, index) => digits[index] || "",
                    ),
                  )
                  otpRefs.current[Math.min(digits.length, 5)]?.focus()
                }}
              >
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      otpRefs.current[index] = element
                    }}
                    aria-label={`Verification code digit ${index + 1}`}
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={value}
                    onChange={(event) => {
                      const digit = event.target.value
                        .replace(/\D/g, "")
                        .slice(-1)
                      setOtp((values) =>
                        values.map((item, i) => (i === index ? digit : item)),
                      )
                      if (digit && index < 5)
                        otpRefs.current[index + 1]?.focus()
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Backspace" && !value && index > 0)
                        otpRefs.current[index - 1]?.focus()
                    }}
                    className="h-14 w-full rounded-lg border border-input bg-white text-center text-xl font-semibold focus:border-primary focus:ring-2 focus:ring-blue-100"
                  />
                ))}
              </div>
              <div className="mt-5 text-center">
                <button
                  disabled={countdown > 0}
                  onClick={() => {
                    setCountdown(30)
                    setError("")
                  }}
                  className="min-h-11 text-xs font-medium text-primary disabled:text-muted-foreground"
                >
                  {countdown > 0
                    ? `Resend code in ${countdown}s`
                    : "Resend code"}
                </button>
              </div>
              <div className="mt-5">
                <Alert>
                  Demo verification code: <strong>123456</strong>. In
                  production, verification must be performed by a secure OTP
                  service.
                </Alert>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Check your details so your tenancy documents are accurate.
              </p>
              <div className="mt-5">
                <Alert type="success">Your session is verified.</Alert>
              </div>
              <div className="mt-6 space-y-5">
                <Field label={rtl ? "الاسم الكامل" : "Full Name"} required>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={fieldClass}
                    autoComplete="name"
                  />
                </Field>
                <Field label="Email Address" required>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={fieldClass}
                    autoComplete="email"
                    dir="ltr"
                  />
                </Field>
                <p className="text-[11px] text-muted-foreground">
                  Your verified mobile: <bdi>{isLandlord ? "+971 55 987 6543" : "+971 50 111 2234"}</bdi>
                </p>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <p className="mt-3 text-sm text-muted-foreground">
                Upload each required document. You can review your details
                before submitting.
              </p>
              <div className="mt-6 rounded-xl bg-blue-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold">
                    {done} of 6 documents complete
                  </span>
                  <span className="text-xs text-primary">
                    {Math.round((done / 6) * 100)}%
                  </span>
                </div>
                <Progress value={(done / 6) * 100} />
              </div>
              <div className="mt-5 space-y-3">
                {docs.map((doc, index) => (
                  <button
                    key={doc.name}
                    onClick={() => {
                      setActiveDoc(index)
                      setFile(null)
                      setPreview("")
                      setError("")
                      setStep(4)
                    }}
                    className="flex min-h-24 w-full items-start gap-3 rounded-xl border border-border p-4 text-start hover:border-blue-200"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                        doc.status === "Done"
                          ? "bg-emerald-50 text-emerald-600"
                          : doc.status === "Action Needed"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-muted-foreground"
                      }`}
                    >
                      {doc.status === "Done" ? (
                        <FileCheck2 size={18} />
                      ) : doc.status === "Action Needed" ? (
                        <TriangleAlert size={18} />
                      ) : (
                        <FileText size={18} />
                      )}
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-semibold">
                        {doc.name}
                      </span>
                      <span className="mt-1.5 block text-[10px] text-muted-foreground">
                        {doc.status === "Not applicable" ? "Optional" : "Required"} · {doc.description}
                      </span>
                      <span className="mt-2 block">
                        <Badge status={doc.status} />
                      </span>
                    </span>
                    <ChevronRight
                      size={16}
                      className="mt-2 shrink-0 text-muted-foreground"
                    />
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Make sure the document is fully visible and well lit.
              </p>
              <div className="mt-6">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  className="hidden"
                  onChange={(event) => pickFile(event.target.files?.[0])}
                />
                <input
                  ref={cameraRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(event) => pickFile(event.target.files?.[0])}
                />
                {preview ? (
                  <div className="overflow-hidden rounded-xl border border-border bg-slate-50">
                    <img
                      src={preview}
                      alt={`Selected ${docs[activeDoc].name} document`}
                      className="max-h-[280px] w-full object-contain"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-5"
                  >
                    <span className="mb-4 rounded-xl bg-white p-4 text-primary shadow-sm">
                      <Upload size={26} />
                    </span>
                    <span className="text-sm font-semibold">
                      {file ? file.name : "Choose your document"}
                    </span>
                    <span className="mt-2 text-[11px] text-muted-foreground">
                      PDF, JPG, PNG or WEBP · Up to 10 MB
                    </span>
                  </button>
                )}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => {
                      setCamera(true)
                      cameraRef.current?.click()
                    }}
                  >
                    <Camera size={17} />
                    Take Photo
                  </Button>
                  <Button onClick={() => fileRef.current?.click()}>
                    <Image size={17} />
                    Gallery / File
                  </Button>
                </div>
                {file && (
                  <p className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700">
                    <Check size={13} />
                    {file.name} · {(file.size / 1024).toFixed(0)} KB selected
                  </p>
                )}
              </div>
              {camera && (
                <div className="mt-4 rounded-xl bg-[#19304e] p-5 text-white">
                  <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-white/60">
                    <p className="text-xs">
                      Keep the document inside the frame
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center gap-2 text-[10px]">
                    <span className="rounded bg-white/10 px-2 py-1">
                      Hold steady
                    </span>
                    <span className="rounded bg-white/10 px-2 py-1">
                      Avoid glare
                    </span>
                  </div>
                </div>
              )}
              <div className="mt-5">
                <Alert>
                  Use a clear, unedited document. Avoid cropped edges, dark
                  images, or glare. You’ll review the details before confirming.
                </Alert>
              </div>
              {processing && (
                <p
                  role="status"
                  className="mt-5 flex items-center gap-2 text-xs text-primary"
                >
                  <LoaderCircle size={16} className="animate-spin" />
                  Preparing document review…
                </p>
              )}
            </>
          )}
          {step === 5 && (
            <>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Check each field against your document and correct anything
                that’s not right.
              </p>
              <div className="mt-5">
                <Alert>
                  These are demo extracted fields. Live OCR is not connected.
                  Verify them against your selected document.
                </Alert>
              </div>
              <div className="mt-6 space-y-5">
                <Field label="Full Name" required>
                  <input
                    className={fieldClass}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Field>
                <Field
                  label={
                    activeDoc === 1 ? "Emirates ID Number" : "Document Number"
                  }
                  required
                >
                  <input
                    className={fieldClass}
                    value={documentNumber}
                    onChange={(event) => setDocumentNumber(event.target.value)}
                    dir="ltr"
                  />
                </Field>
                <Field label="Expiry Date" required>
                  <input
                    type="date"
                    className={fieldClass}
                    value={expiry}
                    onChange={(event) => setExpiry(event.target.value)}
                  />
                </Field>
              </div>
              <p className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground">
                <ShieldCheck size={15} />
                Your agency will verify the document after submission.
              </p>
            </>
          )}
          {step === 6 && (
            <>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Review the cheque information recorded by your agency. No
                payment will be collected here.
              </p>
              <div className="mt-6 rounded-xl border border-border p-4">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Annual rent</span>
                  <span className="font-semibold">AED 125,000</span>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "01 Nov 2026",
                  "01 Feb 2027",
                  "01 May 2027",
                  "01 Aug 2027",
                ].map((date, index) => (
                  <div
                    key={date}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div>
                      <p className="text-xs font-semibold">
                        Cheque {index + 1} · 00034{index + 1}
                      </p>
                      <p className="mt-1.5 text-[11px] text-muted-foreground">
                        Due {date}
                      </p>
                    </div>
                    <div className="text-end">
                      <p className="mb-1.5 text-xs font-semibold">AED 31,250</p>
                      <Badge status="Scheduled" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                Contact Horizon Properties if any cheque details are incorrect.
                This is a record only, not a payment request.
              </p>
            </>
          )}
          {step === 7 && (
            <>
              <p className="mt-3 text-sm text-muted-foreground">
                One final check, then we’ll send your documents to the agency.
              </p>
              <div className="mt-6 rounded-xl border border-border p-5">
                <DetailRows
                  rows={[
                    ["Name", name],
                    ["Email", <bdi>{email}</bdi>],
                    ["Property", "Unit 1204, Marina Heights"],
                    ["Documents", `${done} of 6 complete`],
                  ]}
                />
              </div>
              <div className="mt-6 space-y-5">
                {[
                  {
                    checked: trueConsent,
                    set: setTrueConsent,
                    text: "I confirm the documents and details I’ve provided are true and belong to me.",
                    required: true,
                  },
                  {
                    checked: dataConsent,
                    set: setDataConsent,
                    text: "I consent to my personal data being processed for the purpose of registering this tenancy with Dubai Land Department.",
                    required: true,
                  },
                  {
                    checked: marketing,
                    set: setMarketing,
                    text: "I would like to receive property updates from Horizon Properties.",
                    required: false,
                  },
                ].map((consent) => (
                  <label
                    key={consent.text}
                    className="flex min-h-11 cursor-pointer items-start gap-3"
                  >
                    <input
                      checked={consent.checked}
                      onChange={(event) => consent.set(event.target.checked)}
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                    />
                    <span className="text-[12px] leading-relaxed">
                      {consent.text}
                      <span className="ms-1 text-[10px] text-muted-foreground">
                        {consent.required ? "(Required)" : "(Optional)"}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-6">
                <Alert>
                  Your agency will review your documents. Submission does not
                  mean your tenancy is registered with Ejari yet.
                </Alert>
              </div>
            </>
          )}
          {step === 8 && (
            <>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Your documents have been submitted in this demo. Horizon
                Properties will review your information and contact you if
                anything else is needed.
              </p>
              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-[11px] text-emerald-700">
                  Your reference number
                </p>
                <p className="mt-2 text-base font-semibold text-emerald-900">
                  EJR-2026-004531
                </p>
                <p className="mt-2 text-[10px] text-emerald-700">
                  Demo submission · Not sent to a live agency
                </p>
              </div>
              <h2 className="mb-5 mt-7 text-sm font-semibold">
                What happens next
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Submitted",
                    text: "Your documents are ready for review.",
                    icon: CircleCheck,
                  },
                  {
                    title: "Verification",
                    text: "Your agency checks the documents and details.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Contract",
                    text: "Both parties review and sign the tenancy agreement.",
                    icon: FilePenLine,
                  },
                  {
                    title: "Ejari Registration",
                    text: "Your agency submits the verified case to DLD.",
                    icon: Building2,
                  },
                ].map((item, index) => (
                  <div key={item.title} className="flex gap-3">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                        index === 0
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-muted-foreground"
                      }`}
                    >
                      <item.icon size={17} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold">{item.title}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {error && (
            <div className="mt-5">
              <Alert type="error">{error}</Alert>
            </div>
          )}
        </main>
        <div className="sticky bottom-0 border-t border-border bg-white px-6 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
          {step === 8 ? (
            <Button
              variant="secondary"
              className="w-full min-h-12 text-[13px]"
              onClick={() =>
                downloadPDF("my-tenancy-intake-summary.pdf", [
                  "HORIZON PROPERTIES - CLIENT INTAKE SUMMARY",
                  "DEMO SUBMISSION - NOT A REGISTERED TENANCY",
                  "",
                  "Reference: EJR-2026-004531",
                  `Name: ${name}`,
                  `Email: ${email}`,
                  "Property: Unit 1204, Marina Heights, Dubai Marina",
                  `Documents reviewed: ${done} of 6`,
                  "Annual rent: AED 125,000",
                  "Payment schedule: 4 cheques of AED 31,250",
                  "",
                  "Next: Agency verification, contract signature, DLD submission.",
                  "Registration requires confirmation from the DLD gateway.",
                ])
              }
            >
              <Download size={17} />
              Download my summary (PDF)
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-full min-h-12 text-[13px]"
              disabled={
                processing || (step === 1 && otp.some((digit) => !digit))
              }
              onClick={next}
            >
              {processing ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : null}
              {step === 0
                ? rtl
                  ? "ابدأ الآن"
                  : "Get started"
                : step === 1
                  ? "Verify"
                  : step === 4
                    ? "Review document"
                    : step === 5
                      ? "Confirm document details"
                      : step === 7
                        ? rtl
                          ? "إرسال المستندات"
                          : "Submit documents"
                        : "Continue"}
              {step === 7 ? <Send size={16} /> : <ArrowRight size={16} />}
            </Button>
          )}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-muted-foreground">
            <LockKeyhole size={10} />
            Secure intake · Powered by Ejari Workspace
          </p>
        </div>
      </div>
    </div>
  )
}

function InterfaceStates() {
  const [state, setState] = useState("Loading")
  const [retrying, setRetrying] = useState(false)
  const states: Record<string, {
    icon: LucideIcon
    title: string
    text: string
    type: "info" | "success" | "warning" | "error"
  }> = {
    Loading: {
      icon: LoaderCircle,
      title: "Loading your workspace",
      text: "Please wait while we retrieve the latest case information.",
      type: "info",
    },
    Empty: {
      icon: FolderOpen,
      title: "No cases yet",
      text: "Create your first transaction to begin client intake.",
      type: "info",
    },
    Success: {
      icon: CircleCheck,
      title: "Changes saved",
      text: "Your transaction details have been updated successfully.",
      type: "success",
    },
    Warning: {
      icon: TriangleAlert,
      title: "Review recommended",
      text: "A soft validation block needs your attention before submission.",
      type: "warning",
    },
    "Validation error": {
      icon: ShieldAlert,
      title: "Required information is missing",
      text: "Check the highlighted fields and enter a valid contract end date.",
      type: "error",
    },
    "Server error": {
      icon: ShieldAlert,
      title: "We couldn’t load this case",
      text: "Your saved work is safe. Try again or contact support with reference ERR-004531.",
      type: "error",
    },
    Offline: {
      icon: WifiOff,
      title: "You’re offline",
      text: "Saved records are available. New uploads and gateway requests are paused.",
      type: "warning",
    },
    Reconnecting: {
      icon: RefreshCw,
      title: "Reconnecting to your workspace",
      text: "We’re checking the connection. Do not close an upload in progress.",
      type: "info",
    },
    Maintenance: {
      icon: Settings2,
      title: "Scheduled maintenance",
      text: "DLD submissions are temporarily paused until 22:30 GST. Your cases remain saved.",
      type: "info",
    },
    "Expired link": {
      icon: Clock3,
      title: "This intake link has expired",
      text: "Ask your agency to send a new secure link. Your existing documents are retained.",
      type: "warning",
    },
    "Revoked link": {
      icon: LockKeyhole,
      title: "This intake link was revoked",
      text: "Contact your agency to confirm the correct intake session.",
      type: "error",
    },
    "Session timeout": {
      icon: LockKeyhole,
      title: "Your session has timed out",
      text: "Verify your identity again to continue. Your saved work is safe.",
      type: "warning",
    },
    "Permission denied": {
      icon: ShieldAlert,
      title: "You don’t have access to this action",
      text: "This action requires a compliance or administrator role. Contact your agency admin.",
      type: "error",
    },
    "Case locked": {
      icon: LockKeyhole,
      title: "This case is locked",
      text: "The case is being submitted to DLD. Editing will resume when a response is received.",
      type: "warning",
    },
    "Concurrent editing": {
      icon: Users,
      title: "This case was updated by another user",
      text: "Mariam Saeed saved new information. Refresh to review the latest version before applying changes.",
      type: "warning",
    },
    "Upload processing": {
      icon: LoaderCircle,
      title: "Your document is processing",
      text: "The file has been received. Extraction and validation are in progress.",
      type: "info",
    },
    "Upload failed": {
      icon: Upload,
      title: "Upload couldn’t be completed",
      text: "Choose a PDF or image smaller than 10 MB, then try uploading again.",
      type: "error",
    },
    "DLD push failed": {
      icon: ShieldAlert,
      title: "DLD submission failed",
      text: "DLD-GW-503: Gateway unavailable. Registration has not been confirmed. Retry this request safely.",
      type: "error",
    },
  }
  const active = states[state]
  return (
    <>
      <PageHeader
        title="Interface States"
        subtitle="Reusable feedback patterns for safe, clear operational workflows."
      />
      <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
        <Card className="p-2">
          <nav aria-label="State examples">
            {Object.keys(states).map((value) => (
              <button
                className={`min-h-11 w-full rounded-lg px-3 text-start text-xs ${
                  value === state
                    ? "bg-blue-50 font-medium text-primary"
                    : "text-muted-foreground hover:bg-slate-50"
                }`}
                key={value}
                onClick={() => setState(value)}
              >
                {value}
              </button>
            ))}
          </nav>
        </Card>
        <div className="space-y-5">
          <Card className="p-8">
            <div className="flex flex-col items-center py-10 text-center">
              <span
                className={`mb-5 rounded-2xl p-5 ${
                  active.type === "error"
                    ? "bg-red-50 text-red-600"
                    : active.type === "warning"
                      ? "bg-amber-50 text-amber-600"
                      : active.type === "success"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-primary"
                }`}
              >
                <active.icon
                  size={30}
                  className={
                    state.includes("Loading") || state === "Reconnecting"
                      ? "animate-spin"
                      : ""
                  }
                />
              </span>
              <h2 className="text-xl font-semibold">
                {retrying ? "Trying again…" : active.title}
              </h2>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
                {active.text}
              </p>
              {![
                "Loading",
                "Upload processing",
                "Reconnecting",
                "Success",
              ].includes(state) && (
                <Button
                  variant="primary"
                  className="mt-6"
                  onClick={() => {
                    setRetrying(true)
                    setTimeout(() => setRetrying(false), 1200)
                  }}
                >
                  <RefreshCw size={15} />
                  {state === "Empty"
                    ? "Create Transaction"
                    : state.includes("link") || state === "Permission denied"
                      ? "Contact your agency"
                      : "Try again"}
                </Button>
              )}
            </div>
            {state === "Loading" && (
              <div className="space-y-3 motion-safe:animate-pulse">
                <div className="h-10 rounded bg-slate-100" />
                <div className="h-20 rounded bg-slate-100" />
                <div className="h-20 rounded bg-slate-100" />
              </div>
            )}
          </Card>
          <Card>
            <CardHeader
              title="Status language"
              subtitle="Every state uses an icon and a readable label."
            />
            <div className="flex flex-wrap gap-3 px-5 pb-5">
              {[
                "Draft",
                "Intake",
                "Partial",
                "Validation",
                "Rework",
                "Ready to Push",
                "Awaiting Signature",
                "Push Queued",
                "Push In Progress",
                "Push Failed",
                "Registered",
                "Amendment",
                "Cancellation",
                "Cancelled",
                "Expired",
                "Revoked",
                "Accepted",
                "Rejected",
                "Action Needed",
              ].map((value) => (
                <Badge key={value} status={value} />
              ))}
            </div>
          </Card>
          <Card>
            <CardHeader title="Action variants" />
            <div className="flex flex-wrap gap-3 px-5 pb-5">
              <Button variant="primary">Primary</Button>
              <Button>Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
              <Button variant="primary" disabled>
                <LoaderCircle size={15} className="animate-spin" />
                Loading
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

const router = createBrowserRouter([
  { path: "/intake/:token", Component: IntakePortal },
  { path: "/*", Component: Workspace },
])
export default function App() {
  return <RouterProvider router={router} />
}
