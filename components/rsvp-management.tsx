"use client"

import { useState, useEffect } from "react"
import { Check, X, Trash2, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { getRsvps, updateRsvpStatus, deleteRsvp, type Rsvp, type RsvpStatus } from "@/lib/gift-actions"

export default function RsvpManagement() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([])
  const [filteredRsvps, setFilteredRsvps] = useState<Rsvp[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<RsvpStatus | "all">("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadRsvps = async () => {
    try {
      const data = await getRsvps()
      setRsvps(data)
      applyFilters(data, searchTerm, statusFilter)
    } catch (error) {
      console.error("Failed to load RSVPs:", error)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadRsvps()
  }, [])

  const applyFilters = (data: Rsvp[], search: string, status: RsvpStatus | "all") => {
    let filtered = [...data]

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (rsvp) => rsvp.name.toLowerCase().includes(searchLower) || rsvp.email.toLowerCase().includes(searchLower),
      )
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((rsvp) => rsvp.status === status)
    }

    setFilteredRsvps(filtered)
  }

  useEffect(() => {
    applyFilters(rsvps, searchTerm, statusFilter)
  }, [searchTerm, statusFilter, rsvps])

  const handleStatusChange = async (id: string, status: RsvpStatus) => {
    try {
      await updateRsvpStatus(id, status)
      setRsvps((prev) => prev.map((rsvp) => (rsvp.id === id ? { ...rsvp, status } : rsvp)))
    } catch (error) {
      console.error("Failed to update RSVP status:", error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      await deleteRsvp(deleteId)
      setRsvps((prev) => prev.filter((rsvp) => rsvp.id !== deleteId))
      setDeleteId(null)
    } catch (error) {
      console.error("Failed to delete RSVP:", error)
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    loadRsvps()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status: RsvpStatus) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "declined":
        return <Badge className="bg-red-500">Declined</Badge>
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>
    }
  }

  const getTotalGuests = () => {
    return filteredRsvps.filter((rsvp) => rsvp.status === "confirmed").reduce((total, rsvp) => total + rsvp.guests, 0)
  }

  if (loading) {
    return <div className="text-center py-12">Loading RSVPs...</div>
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as RsvpStatus | "all")}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing} className="flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <p className="font-medium">
              Total RSVPs: <span className="font-bold">{filteredRsvps.length}</span>
            </p>
            <p className="font-medium">
              Confirmed Guests: <span className="font-bold">{getTotalGuests()}</span>
            </p>
          </div>
          <div>
            <p className="font-medium">
              Confirmed:{" "}
              <span className="font-bold">{filteredRsvps.filter((r) => r.status === "confirmed").length}</span>
            </p>
            <p className="font-medium">
              Pending: <span className="font-bold">{filteredRsvps.filter((r) => r.status === "pending").length}</span>
            </p>
            <p className="font-medium">
              Declined: <span className="font-bold">{filteredRsvps.filter((r) => r.status === "declined").length}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Guests</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRsvps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No RSVPs found
                </TableCell>
              </TableRow>
            ) : (
              filteredRsvps.map((rsvp) => (
                <TableRow key={rsvp.id}>
                  <TableCell className="font-medium">{rsvp.name}</TableCell>
                  <TableCell>{rsvp.email}</TableCell>
                  <TableCell className="text-center">{rsvp.guests}</TableCell>
                  <TableCell>{formatDate(rsvp.createdAt)}</TableCell>
                  <TableCell>{getStatusBadge(rsvp.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {rsvp.status !== "confirmed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-green-500 border-green-200 hover:bg-green-50"
                          onClick={() => handleStatusChange(rsvp.id, "confirmed")}
                          title="Confirm"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Confirm</span>
                        </Button>
                      )}

                      {rsvp.status !== "declined" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => handleStatusChange(rsvp.id, "declined")}
                          title="Decline"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Decline</span>
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-50"
                        onClick={() => setDeleteId(rsvp.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this RSVP. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
