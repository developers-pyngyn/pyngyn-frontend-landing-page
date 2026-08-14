/*
 * Inline stroke icons for the ClientSpace product mockup.
 *
 * The repo has no icon package (icons are hand-written inline SVG per
 * component — see Navbar/MegaNav), so this file is the mockup's local set.
 * Every icon is a 24-box, 1.8 stroke, currentColor path so the caller only
 * has to size it (`h-[18px] w-[18px]`) and set a text color.
 */
import type { ReactNode, SVGProps } from "react";

export type ShowcaseIcon = (props: SVGProps<SVGSVGElement>) => ReactNode;

function box(children: ReactNode, viewProps?: SVGProps<SVGSVGElement>): ShowcaseIcon {
  const Icon: ShowcaseIcon = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...viewProps}
      {...props}
    >
      {children}
    </svg>
  );
  return Icon;
}

/* — sidebar nav — */
export const IconDashboard = box(
  <>
    <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
  </>,
);

export const IconClients = box(
  <>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M3 20c0-3.1 2.7-5.2 6-5.2s6 2.1 6 5.2" />
    <path d="M16.5 5.4a3.2 3.2 0 0 1 0 5.6M18 14.4c2 .7 3.4 2.4 3.4 4.6" />
  </>,
);

export const IconRequests = box(
  <>
    <path d="M3 13.5h4l1.6 2.6h6.8L17 13.5h4" />
    <path d="M5.4 5.2 3 13.5V19a1.6 1.6 0 0 0 1.6 1.6h14.8A1.6 1.6 0 0 0 21 19v-5.5l-2.4-8.3a1.6 1.6 0 0 0-1.5-1.1H6.9a1.6 1.6 0 0 0-1.5 1.1Z" />
  </>,
);

export const IconWorkflows = box(
  <>
    <circle cx="6" cy="5.5" r="2.4" />
    <circle cx="18" cy="12" r="2.4" />
    <circle cx="6" cy="18.5" r="2.4" />
    <path d="M6 7.9v8.2M8.2 6.4c4.6.4 6.6 2 7.5 4.6M8.2 17.6c4.6-.4 6.6-2 7.5-4.6" />
  </>,
);

export const IconContracts = box(
  <>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
    <path d="M14 3l5 5v3" />
    <path d="M8.5 8.5h2.5M8.5 12h4" />
    <path d="M13.5 20.5c1.6-.4 1.9-1.6 2.4-3.2.5-1.6 1.3-2.2 2-1.7.8.6.2 2-.4 3.1-.5 1-.3 1.6.5 1.6h2.5" />
  </>,
);

export const IconProjects = box(
  <>
    <path d="M3 7.2a2 2 0 0 1 2-2h3.4l1.8 2.2H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <path d="M8.6 11.4v5M12 11.4v3M15.4 11.4v6" />
  </>,
);

export const IconChat = box(
  <>
    <path d="M20.5 11.6c0 4-3.8 7.2-8.5 7.2a9.8 9.8 0 0 1-2.7-.4L4.6 20.4l1.2-3.4a6.9 6.9 0 0 1-2.3-5.4c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z" />
    <path d="M9 11.5h.01M12 11.5h.01M15 11.5h.01" strokeWidth={2.4} />
  </>,
);

export const IconTasks = box(
  <>
    <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4" />
    <path d="M8.2 12.2l2.7 2.7 5-5.4" />
  </>,
);

export const IconTime = box(
  <>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3.2 2" />
  </>,
);

export const IconDocuments = box(
  <>
    <path d="M13.6 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.4Z" />
    <path d="M13.4 3.2V8h5.4M8.6 13h6.8M8.6 16.6h4.6" />
  </>,
);

export const IconApprovals = box(
  <>
    <path d="M12 3.2 14 5l2.6-.3 1 2.5 2.3 1.3-.7 2.5.7 2.5-2.3 1.3-1 2.5-2.6-.3-2 1.8-2-1.8-2.6.3-1-2.5-2.3-1.3.7-2.5-.7-2.5L4.4 7.2l1-2.5L8 5Z" />
    <path d="M9.2 12.1l2 2 3.6-4" />
  </>,
);

export const IconInvoices = box(
  <>
    <path d="M5 3.6h14v17.2l-2.3-1.6-2.4 1.6-2.3-1.6-2.4 1.6L7 19.2l-2 1.6Z" />
    <path d="M8.6 8h6.8M8.6 11.8h4.6" />
  </>,
);

/* — chrome — */
export const IconSearch = box(
  <>
    <circle cx="10.8" cy="10.8" r="6.4" />
    <path d="M15.6 15.6 20.4 20.4" />
  </>,
);

export const IconTrash = box(
  <>
    <path d="M4.6 7h14.8M9.4 7V4.8h5.2V7" />
    <path d="M6.6 7l.9 12a1.8 1.8 0 0 0 1.8 1.7h5.4a1.8 1.8 0 0 0 1.8-1.7l.9-12" />
  </>,
);

export const IconMembers = box(
  <>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.6 20c0-3.3 2.9-5.6 6.4-5.6s6.4 2.3 6.4 5.6" />
  </>,
);

export const IconShield = box(
  <>
    <path d="M12 3.2 5 6v5.4c0 4.2 2.9 7.6 7 9.4 4.1-1.8 7-5.2 7-9.4V6Z" />
  </>,
);

export const IconWarning = box(
  <>
    <path d="M10.6 4.2 3.2 17.4a1.6 1.6 0 0 0 1.4 2.4h14.8a1.6 1.6 0 0 0 1.4-2.4L13.4 4.2a1.6 1.6 0 0 0-2.8 0Z" />
    <path d="M12 9.4v4M12 16.6h.01" strokeWidth={2.2} />
  </>,
);

export const IconChevronDown = box(<path d="M6 9.5 12 15.5 18 9.5" />);
export const IconChevronLeft = box(<path d="M14.5 6 8.5 12 14.5 18" />);
export const IconChevronRight = box(<path d="M9.5 6 15.5 12 9.5 18" />);

export const IconSparkle = box(
  <>
    <path d="M12 3.6l1.7 4.4 4.4 1.7-4.4 1.7L12 15.8l-1.7-4.4L5.9 9.7l4.4-1.7Z" />
    <path d="M18.4 15.6l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
  </>,
);

export const IconBolt = box(<path d="M13.4 2.8 5.2 13.4h5.1l-.7 7.8 8.2-10.6h-5.1Z" />);

export const IconMessage = box(
  <>
    <path d="M20.4 14.2a2 2 0 0 1-2 2H8.6l-4 3.4v-14a2 2 0 0 1 2-2h11.8a2 2 0 0 1 2 2Z" />
  </>,
);

export const IconSun = box(
  <>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.8v2.2M12 19v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.8 12H5M19 12h2.2M4.4 19.6 6 18M18 6l1.6-1.6" />
  </>,
);

export const IconBell = box(
  <>
    <path d="M18 9.2a6 6 0 1 0-12 0c0 5-2 6.4-2 6.4h16s-2-1.4-2-6.4Z" />
    <path d="M13.7 19.4a2 2 0 0 1-3.4 0" />
  </>,
);

export const IconCalendar = box(
  <>
    <rect x="3.6" y="5" width="16.8" height="15.4" rx="3" />
    <path d="M3.6 10h16.8M8.4 3.4v3.2M15.6 3.4v3.2" />
  </>,
);

export const IconPlus = box(<path d="M12 5.4v13.2M5.4 12h13.2" strokeWidth={2.1} />);

export const IconCheck = box(<path d="M5.4 12.6 10 17.2 18.6 7.4" strokeWidth={2.2} />);

export const IconGrip = box(
  <>
    <path d="M9 6.5h.01M15 6.5h.01M9 12h.01M15 12h.01M9 17.5h.01M15 17.5h.01" strokeWidth={2.6} />
  </>,
);

/* — Business Brain — */
export const IconPortal = box(
  <>
    <rect x="3.4" y="4.4" width="17.2" height="15.2" rx="3" />
    <path d="M3.4 9h17.2M7.4 6.7h.01M10 6.7h.01" strokeWidth={2.2} />
  </>,
);

export const IconBilling = box(
  <>
    <rect x="3" y="5.6" width="18" height="12.8" rx="3" />
    <path d="M3 10h18M6.8 14.4h3.6" />
  </>,
);

export const IconReports = box(
  <>
    <path d="M4 20.4h16" />
    <path d="M7 20.4V12M12 20.4V6.6M17 20.4v-5.6" />
  </>,
);

export const IconKnowledge = box(
  <>
    <path d="M4.4 5.2A1.8 1.8 0 0 1 6.2 3.4H11v17.2H6.2a1.8 1.8 0 0 1-1.8-1.8Z" />
    <path d="M19.6 5.2a1.8 1.8 0 0 0-1.8-1.8H13v17.2h4.8a1.8 1.8 0 0 0 1.8-1.8Z" />
  </>,
);

export const IconProposals = box(
  <>
    <path d="M13.6 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.4Z" />
    <path d="M13.4 3.2V8h5.4" />
    <path d="M9.2 14.6l2.2 2.2 4-4.4" />
  </>,
);

export const IconCopy = box(
  <>
    <rect x="9" y="9" width="11.4" height="11.4" rx="2.6" />
    <path d="M15 6.4V6a2.4 2.4 0 0 0-2.4-2.4H6A2.4 2.4 0 0 0 3.6 6v6.6A2.4 2.4 0 0 0 6 15h.4" />
  </>,
);

export const IconThumbUp = box(
  <>
    <path d="M7.6 10.6 11 3.6a2.2 2.2 0 0 1 2.2 2.2v3.4h4.6a2 2 0 0 1 2 2.3l-1 6a2 2 0 0 1-2 1.7H7.6Z" />
    <rect x="3.4" y="10.6" width="4.2" height="8.6" rx="1.4" />
  </>,
);

export const IconThumbDown = box(
  <>
    <path d="M7.6 13.4 11 20.4a2.2 2.2 0 0 0 2.2-2.2v-3.4h4.6a2 2 0 0 0 2-2.3l-1-6a2 2 0 0 0-2-1.7H7.6Z" />
    <rect x="3.4" y="4.8" width="4.2" height="8.6" rx="1.4" />
  </>,
);

export const IconRefresh = box(
  <>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20.4 4v4.4H16" />
  </>,
);

export const IconArrowUp = box(<path d="M12 19V5.6M6.4 11.2 12 5.6l5.6 5.6" strokeWidth={2.1} />);

/* Small PYNGYN wordmark companion: a filled coral tile with a white "pin".
   Drawn (not <img>) so the mockup ships zero extra network requests. */
export function PyngynMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="7" fill="#F2545B" />
      <path
        d="M9 18V7.2h4.1a3.5 3.5 0 0 1 0 7H9"
        fill="none"
        stroke="#fff"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
