import type { ProjectStatuses } from "src/content/enum"

export const getThumbnailUrl: (originalUrl: string) => string = (originalUrl) => {

  const fileName = originalUrl.split(new RegExp("giantsize|fullsize|largesize|mediumsize"))[0]
  return `${fileName}thumbnail.avif`

}

export const statusToDisplayText: (status: ProjectStatuses) => string = (status) => {
  switch (status) {
    case "eol":
      return "End of life"

    case "gb-closed":
      return "Group buy closed"

    case "pending-gb":
      return "Pending group buy"

    case "pre-announcement":
      return "Pre-announcement"

    case "preparing-sale":
      return "Preparing for sale"

    default:
      const dashesReplacedString = status.replaceAll("-", " ")
      return dashesReplacedString.charAt(0).toUpperCase() + dashesReplacedString.substring(1)
  }
}

export const statusToIcon: (status: ProjectStatuses | undefined | null) => string = (status) => {

  switch (status) {

    case "announced":
      return "ph:bell-ringing"

    case "archived":
    case "eol":
      return "ph:archive-box"

    case "cancelled":
      return "ph:x"

    case "complete":
      return "ph:check"

    case "shipping":
    case "en-route":
      return "ph:truck"

    case "extras-sale":
    case "final-sale":
      return "ph:clock-countdown"

    case "preorder-closed":
    case "gb-closed":
      return "ph:calendar-check"

    case "preorder":
    case "group-buy":
    case "ordered":
    case "in-stock":
      return "ph:shopping-cart"

    case "manufacturing":
    case "preparing-sale":
      return "ph:wrench"

    case "on-hold":
      return "ph:pause"

    case "pending-gb":
    case "pending-preorder":
      return "ph:bell-ringing"

    case "restocking":
      return "ph:clock-clockwise"

    case "sold-out":
      return "ph:tote"

    case "pre-announcement":
    default:
      return "ph:flag-banner-fold"
  }
}

export const statusToProgress: (status: ProjectStatuses | undefined | null) => number = (status) => {

  switch (status) {

    case "pre-announcement":
    case "archived":
    case "eol":
    case "cancelled":
    case "on-hold":
      return 0

    case "announced":
      return 10

    case "pending-gb":
    case "pending-preorder":
      return 15

    case "preorder":
    case "group-buy":
      return 20

    case "preorder-closed":
    case "gb-closed":
      return 30

    case "ordered":
      return 40

    case "manufacturing":
      return 50

    case "en-route":
      return 60

    case "shipping":
      return 80

    case "extras-sale":
      return 90

    case "complete":
      return 100

    case "preparing-sale":
      return 30

    case "in-stock":
    case "sold-out":
    case "restocking":
      return 75

    case "final-sale":
      return 90

    default:
      return 0
  }
}

export const dateToDisplayString = (date: Date) => {
  return date.toISOString().split('T')[0]
}