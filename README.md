# The Social Company

Everything you need to build on social media.

There are four tools in this repository:

- [Odkryj](/apps/odkryj/README.md) - Find trends on social media.
- [Istota](/apps/istota/README.md) - Create content for social media.
- [Sotsial](/apps/sotsial/README.md) - Publish to all social media platforms.
- [Zroby](/apps/zroby/README.md) - A personal assistant for social media.

All of these tools are API-first (except for Zroby, which is a web app).

---

## Overview

Here's a high-level overview of the tools:

### Odkryj

Odkryj scans through social media across multiple devices, scraping content, metadata, and then using AI to analyse it.

It's powered by the [Odkryj Engine](#odkryj-engine).

### Istota

Istota is a content creation tool powered by the [Istota Engine](#istota-engine) which enables developers to quickly generate programmatic images and videos (or use AI).

### Sotsial

Sotsial is a tool for publishing to all social media platforms — its essentially a wrapper around [the `sotsial` package](./packages/sotsial/README.md) with added features.

### Zroby

Zroby is probably the most fun tool — it combines the power of all the other tools to create a personal assistant for social media.

I won't go into depth on Zroby, but imagine telling a friend to do something on social media, and Zroby does it for you.

---

## Odkryj Engine

The Odkryj Engine is a Rust-based package that allows you to control a device to be used for web scraping with automation and bypassing anti-botting measures.

The engine will soon be open-sourced in a separate repository.

---

## Istota Engine

The Istota Engine is a Rust-based alternative to [Remotion](https://www.remotion.dev/), enabling developers to create programmatic images and videos.

The engine will soon be open-sourced in a separate repository.

---

## FAQs

### Why open-source?

I hate how most social media tools are proprietary when they are, in fact, so simple — so I built them.

### Why not use existing tools?

I'll answer this question soon.

---

## License

This repository contains code under different licenses:

- **Apps** (`/apps/`) are licensed under **AGPL-3.0** - see [`apps/LICENSE`](/apps/LICENSE)
- **Packages** (`/packages/`) may have different licenses:
  - [`sotsial`](/packages/sotsial/) is licensed under **MIT**
  - Other packages may vary - check individual `LICENSE` files

**Important**: If you use or derive from the AGPL-3.0 licensed apps, your entire project must also be AGPL-3.0 licensed. The MIT licensed packages can be used independently under more permissive terms.

<sub>Copyright © 2025 Arsen Shkrumelyak. All rights reserved.</sub>
