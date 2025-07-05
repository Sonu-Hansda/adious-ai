export interface Campaign {
    id: number;
    name: string;
    platform: 'Meta' | 'Google' | 'TikTok';
    status: 'Active' | 'Paused';
    budget: number;
    spent: number;
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    cpa: number;
}