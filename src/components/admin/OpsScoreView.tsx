/**
 * /admin/opsscore — OpsScore leads and funnel. Uses Payload's own login.
 * `?sesi=<id>` shows one session with its raw answers.
 */
import type { AdminViewServerProps } from 'payload';
import { DefaultTemplate } from '@payloadcms/next/templates';
import { Gutter } from '@payloadcms/ui';
import { redirect } from 'next/navigation';
import { LeadList, SessionDetail } from './OpsScorePanels';

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function OpsScoreView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, permissions, visibleEntities, locale } = initPageResult;
  const adminRoute = req.payload.config.routes.admin;
  const base = `${adminRoute}/opsscore`;
  if (!req.user) redirect(`${adminRoute}/login?redirect=${encodeURIComponent(base)}`);

  const sessionId = first(searchParams?.sesi);
  const content = sessionId ? (
    await SessionDetail({ payload: req.payload, id: sessionId, base, apiRoute: req.payload.config.routes.api })
  ) : (
    await LeadList({
      payload: req.payload,
      searchParams: searchParams as Record<string, string | string[] | undefined>,
      base,
      apiRoute: req.payload.config.routes.api,
    })
  );

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user ?? undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <div style={{ padding: '24px 0 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>{content}</div>
      </Gutter>
    </DefaultTemplate>
  );
}
