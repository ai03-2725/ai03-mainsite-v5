import { z } from 'astro:content';

export const PROJECT_STATUS_STRINGS = [
  // Early statuses
  'pre-announcement',
  'announced', 

  // Early GB flow
  'pending-gb',
  'group-buy',
  'gb-closed',

  // Early preorder flow
  'pending-preorder',
  'preorder',
  'preorder-closed',

  // Post-early-sale flow
  'ordered', 
  'manufacturing', 
  'en-route', 
  'shipping', 
  'extras-sale',

  // In-stock flow
  'preparing-sale',
  'in-stock',
  'sold-out',
  'restocking',
  'final-sale',

  // Completion states
  'complete',
  'cancelled',
  'eol',
  'on-hold',
  'archived',
] as const

export const PROJECT_STATUSES = z.enum(PROJECT_STATUS_STRINGS)

export type ProjectStatuses = typeof PROJECT_STATUS_STRINGS[number]