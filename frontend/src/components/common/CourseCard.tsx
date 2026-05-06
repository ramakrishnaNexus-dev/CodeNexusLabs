import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import axios from 'axios';

const API_URL = 'https://codenexuslabs-production.up.railway.app/api/v1';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  studentsCount?: number;
  rating?: number;
  difficulty?: string;
  image?: string;
}

const difficultyBadge: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  Advanced: 'bg-rose-100 text-rose-700 border-rose-200',
};

const CourseCard = ({ course }: { course: Course }) => {
  const { id, title, description, category, duration, studentsCount = 0, rating = 4.5, difficulty = 'Beginner' } = course;
  const [iconMap, setIconMap] = useState<Record<string, string>>({});

  useEffect(() => {
    axios.get(`${API_URL}/categories`)
      .then((res: any) => {
        const data = res.data?.data || res.data || [];
        const map: Record<string, string> = {};
        if (Array.isArray(data)) {
          data.forEach((c: any) => { if (c.name && c.iconUrl) map[c.name] = c.iconUrl; });
        }
        setIconMap(map);
      }).catch(() => {});
  }, []);

  const iconUrl = iconMap[category] || '';

  return (
    <Link to={`/courses/${id}`} className="card group overflow-hidden flex flex-col w-full bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-32 bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center relative border-b border-gray-100">
        {iconUrl ? (
          <img src={iconUrl} alt={category} className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" loading="lazy" />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {category?.charAt(0) || '?'}
          </div>
        )}
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold border shadow-sm ${difficultyBadge[difficulty] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
          {difficulty}
        </span>
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/80 backdrop-blur-sm text-gray-500 shadow-sm">
          👥 {studentsCount.toLocaleString()}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="inline-flex self-start px-2 py-0.5 rounded-md text-[10px] font-semibold mb-2 bg-indigo-100 text-indigo-700">{category}</span>
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">{title}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2.5 border-t border-gray-100">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{duration}</span>
          <span className="flex items-center gap-1 text-amber-500 font-semibold"><Star className="w-3 h-3 fill-amber-400" />{rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;