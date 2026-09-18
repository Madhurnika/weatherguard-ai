import type { Risk } from '../utils/weatherRisk';

export default function Alerts({ risks = [] }: { risks?: Risk[] }) {
	return <section className="about-panel" id="alerts-page"><p className="eyebrow">WEATHER ALERTS</p><h2>System-generated alerts</h2><p>These notices are derived from the current dashboard conditions and are intended to support everyday planning.</p><div className="risk-summary">{risks.length ? risks.map(risk => <div key={risk.type}><b>{risk.level}</b><span>{risk.type}<small>{risk.reason}</small></span></div>) : <div><b>SAFE</b><span>No weather data loaded yet.</span></div>}</div></section>;
}
