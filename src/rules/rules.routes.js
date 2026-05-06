import express from 'express';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

router.get('/', async (_req, res) => {
    const { data, error } = await supabase
        .from('rules')
        .select('rule_id, rule_name')
        .order('rule_name');
    if (error) return res.status(500).json({ success: false, message: error.message });
    return res.json({ success: true, data });
});

export default router;
