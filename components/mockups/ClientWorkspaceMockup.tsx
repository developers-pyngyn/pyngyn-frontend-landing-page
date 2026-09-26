"use client";

import React from "react";
import { PyngynWebsiteProduct, ProductScreenType } from "../product/website/PyngynWebsiteProduct";
import { WebsiteProductAnimator } from "../product/website/WebsiteProductAnimator";
import { PyngynCelebrationOverlay } from "../product-demo/PyngynCelebrationOverlay";

interface ClientWorkspaceMockupProps {
  className?: string;
  initialClient?: "oswal" | "shreeji";
  viewMode?: "tasks" | "dossier" | "board" | "calendar" | "audit";
  enableCameraZoom?: boolean;
}

export function ClientWorkspaceMockup({
  className = "",
  initialClient = "oswal",
  viewMode = "tasks",
  enableCameraZoom = true,
}: ClientWorkspaceMockupProps) {
  const screenType: ProductScreenType =
    viewMode === "board"
      ? "board"
      : viewMode === "calendar"
      ? "calendar"
      : viewMode === "audit"
      ? "audit"
      : "tasks";

  const content = (
    <PyngynWebsiteProduct
      screen={screenType}
      clientId={initialClient}
      className={className}
    />
  );

  return (
    <div className="relative w-full overflow-visible">
      <WebsiteProductAnimator enableScrollZoom={enableCameraZoom}>
        {content}
      </WebsiteProductAnimator>

      {/* Floating Celebration Overlay on top / outer side */}
      <div className="absolute -top-3 sm:-top-5 right-4 sm:right-10 z-50 pointer-events-none drop-shadow-2xl">
        <PyngynCelebrationOverlay
          title="GST Portal Live-Synced"
          subtitle="Oswal Exports · ₹14.8L ITC Reconciled"
          statusText="Verified"
          avatarSrc="/team/vivek-pandey.png"
          mascotSrc="/mascot/pyngyn-insights.png"
          showCursor={true}
          cursorOffset={{ x: 135, y: 14 }}
        />
      </div>
    </div>
  );
}
