"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CheckCircle, XCircle, Calendar, FileText, AlertCircle, Check, X, Trash2, User, Activity, BarChart, Clock, Briefcase, Users, Mail } from 'lucide-react'
import ParticipationMainSection from "./[participationId]/components/ParticipationMainSection"
import ParticipationRightBar from "./components/ParticipationRightBar"

interface MyParticipationsLayoutProps {
  children: React.ReactNode;
}


export default function MyParticipationsLayout({ children }: MyParticipationsLayoutProps) {


  return (
    <div className="flex h-full gap-5">
      {/* <ParticipationMainSection></ParticipationMainSection> */}
      <div className="flex-1">
        {children}
      </div>
      <div className="w-[30%]">
        <ParticipationRightBar></ParticipationRightBar>

      </div>
    </div>
  )
}