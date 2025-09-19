"use client";
import React from "react";

import { Users, MousePointerClick, Globe, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "@/styles/page/analystDashboard.module.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const visitorData = [
  { day: "Mon", visitors: 1200, clicks: 350 },
  { day: "Tue", visitors: 1450, clicks: 420 },
  { day: "Wed", visitors: 1700, clicks: 500 },
  { day: "Thu", visitors: 1350, clicks: 390 },
  { day: "Fri", visitors: 1900, clicks: 600 },
  { day: "Sat", visitors: 2100, clicks: 680 },
  { day: "Sun", visitors: 1600, clicks: 450 },
];

export default function AnalystDashboard() {
  return (
    <div className={styles.dashboardGrid}>
      {/* Stats Overview */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle>Total Visitors</CardTitle>
          <Users className={styles.iconBlue} />
        </CardHeader>
        <CardContent>
          <p className={styles.bigText}>12,340</p>
          <p className={styles.successText}>
            <TrendingUp className={styles.smallIcon} /> +12% this week
          </p>
        </CardContent>
      </Card>

      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle>Clicks</CardTitle>
          <MousePointerClick className={styles.iconPurple} />
        </CardHeader>
        <CardContent>
          <p className={styles.bigText}>4,520</p>
          <p className={styles.errorText}>-3% this week</p>
        </CardContent>
      </Card>

      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle>Global Reach</CardTitle>
          <Globe className={styles.iconTeal} />
        </CardHeader>
        <CardContent>
          <p className={styles.bigText}>68 Countries</p>
          <p className={styles.mutedText}>Active visitors worldwide</p>
        </CardContent>
      </Card>

      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle>Conversions</CardTitle>
          <TrendingUp className={styles.iconGreen} />
        </CardHeader>
        <CardContent>
          <p className={styles.bigText}>2,140</p>
          <p className={styles.successText}>+8% this week</p>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card className={`${styles.card} ${styles.chartCard}`}>
        <CardHeader>
          <CardTitle>Visitors & Clicks Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#2563eb"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#9333ea"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
