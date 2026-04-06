"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { SectionCard } from "@/components/shared/section-card"
import { ActionButton } from "@/components/shared/action-button"
import { FormInput } from "@/components/shared/form-input"

interface Account {
  id: string
  tiktokId: string
  email: string
  profile: string
  machine: string
  isSystem?: boolean
}

const initialAccounts: Account[] = [
  { id: "0", tiktokId: "[SYSTEM]", email: "Dùng cho Trạm Remix Thủ Công", profile: "manual_shared_profile", machine: "Toàn bộ", isSystem: true },
  { id: "1", tiktokId: "24h.vui.v8", email: "abc", profile: "24hvuiv8_profile", machine: "Máy: 1" },
  { id: "2", tiktokId: "gbn.car.24h", email: "car123@gmail.com", profile: "gbncar24h_profile", machine: "Máy: 1" },
  { id: "3", tiktokId: "showbiz124h", email: "showbiz124h@gmail.com", profile: "showbiz124h_profile", machine: "Máy: 1" },
  { id: "4", tiktokId: "taichinh24444h", email: "muhammadfariqmuhsin@madrasah.kem...", profile: "taichinh24444h_pro...", machine: "Máy: 1" },
  { id: "5", tiktokId: "tintucthammy24h", email: "tintucthammy24h", profile: "tintucthammy24h_pr...", machine: "Máy: 1" },
  { id: "6", tiktokId: "phongmokechuyen01", email: "phongmokechuyen01@gmail.com", profile: "phongmokechuyen01_...", machine: "Máy: 1" },
]

export function AccountsView() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [formData, setFormData] = useState({
    tiktokHandle: "",
    email: "",
    password: "",
    machine: "1",
  })

  const handleSave = () => {
    if (formData.tiktokHandle && formData.email) {
      const newAccount: Account = {
        id: Date.now().toString(),
        tiktokId: formData.tiktokHandle,
        email: formData.email,
        profile: `${formData.tiktokHandle}_profile`,
        machine: `Máy: ${formData.machine}`,
      }
      setAccounts([...accounts, newAccount])
      setFormData({ tiktokHandle: "", email: "", password: "", machine: "1" })
    }
  }

  const handleDelete = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Quản lý Tài khoản & Profile</h1>

      {/* Add/Edit Form */}
      <SectionCard title="[+] Thêm / Sửa Tài khoản">
        <div className="p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FormInput
              label="TikTok Handle (@abc):"
              type="text"
              placeholder="@..."
              value={formData.tiktokHandle}
              onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
            />
            <FormInput
              label="Email Google:"
              type="email"
              placeholder="email@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <FormInput
              label="Mật khẩu Email:"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <FormInput
              label="Giao cho Máy số:"
              type="number"
              value={formData.machine}
              onChange={(e) => setFormData({ ...formData, machine: e.target.value })}
            />
          </div>
          <ActionButton
            variant="primary"
            onClick={handleSave}
          >
            [SAVE] TẠO TÀI KHOẢN
          </ActionButton>
        </div>
      </SectionCard>

      {/* Accounts Table */}
      <SectionCard title="[v] Danh sách Tài khoản & Quản lý Profile:">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {accounts.map((account) => (
                <tr
                  key={account.id}
                  className={`border-b border-border/50 last:border-0 ${
                    account.isSystem ? "bg-secondary/30" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${account.isSystem ? "text-yellow-400" : "text-foreground"}`}>
                      {account.tiktokId}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{account.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${account.isSystem ? "text-orange-400" : "text-muted-foreground"}`}>
                      Profile: {account.profile}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-primary">{account.machine}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {account.isSystem ? (
                        <>
                          <button className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                            Chr
                          </button>
                          <button className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground hover:bg-secondary/80">
                            Clear Data
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground hover:bg-secondary/80">
                            <span className="flex items-center gap-1">
                              <Pencil className="h-3 w-3" /> Sửa
                            </span>
                          </button>
                          <button
                            onClick={() => handleDelete(account.id)}
                            className="rounded-md bg-destructive px-2.5 py-1 text-xs font-medium text-destructive-foreground hover:bg-destructive/90"
                          >
                            <span className="flex items-center gap-1">
                              <Trash2 className="h-3 w-3" /> Xóa
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
