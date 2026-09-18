import type { Request, Response, NextFunction } from 'express';
import { getWeatherByCity, getWeatherByCoordinates } from '../services/weatherService';

export async function city(req: Request, res: Response, next: NextFunction) { try { const value = String(req.params.city ?? '').trim(); if (!value) return res.status(400).json({ message: 'City is required.' }); return res.json(await getWeatherByCity(value)); } catch (error) { next(error); } }
export async function coordinates(req: Request, res: Response, next: NextFunction) { try { const lat = Number(req.query.lat); const lon = Number(req.query.lon); if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) return res.status(400).json({ message: 'Valid latitude and longitude are required.' }); return res.json(await getWeatherByCoordinates(lat, lon)); } catch (error) { next(error); } }
export async function forecast(req: Request, res: Response, next: NextFunction) { return city(req, res, next); }
