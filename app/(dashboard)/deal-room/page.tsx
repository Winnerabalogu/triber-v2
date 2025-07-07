"use client"

import { useState, useEffect, useMemo } from 'react';
import CoreService from '@/services/core.service';
import { Investor } from '@/lib/types';
import InvestorCard from '@/components/dashboard/deal-room/InvestorCard';
import DealRoomLanding from '@/components/dashboard/deal-room/DealRoomLanding'; 
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Tag from '@/components/ui/tag';

type FilterType = 'industry' | 'location' | 'investorType';

export default function DealRoomPage() {
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
      name: '',
      location: '',
      industry: '',
      investorType: ''
    });
    
    const [activeFilterSelect, setActiveFilterSelect] = useState<FilterType | null>(null);    
    const filterOptions = useMemo(() => ({
      industry: { label: "Industry", values: ["Fintech", "Retail", "Logistics", "SaaS", "AI", "Healthcare", "Education", "Energy"] },
      location: { label: "Location", values: ["Lagos", "Nairobi", "Accra", "London", "Cape Town"] },
      investorType: { label: "Investor Type", values: ["VC", "Angel", "Corporate", "PE Firm"] }
    }), []);

    useEffect(() => {
        const fetchInvestors = async () => {
            setIsLoading(true);
            try {
                const data = await CoreService.getInvestors(filters);
                setInvestors(data.investors);
            } catch (error) {
                console.error("Failed to fetch investors", error);
                setInvestors([]); 
            } finally {
                setIsLoading(false);
            }
        };                
        const timer = setTimeout(() => fetchInvestors(), 300);
        return () => clearTimeout(timer);

    }, [filters]);    
    const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
        if (filterName !== 'name') {
          setActiveFilterSelect(null);
        }
    };
    
    const activeFiltersList = Object.entries(filters)
      .filter(([key, value]) => key !== 'name' && value !== '');

    return (
        <div className="space-y-6">
            <DealRoomLanding />            
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <h2 className="text-2xl font-bold text-foreground self-start">See all investors</h2>
                    <div className="flex gap-2 w-full flex-wrap md:w-auto md:flex-nowrap">                        
                        <div className="relative flex-grow min-w-[200px]">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input placeholder="Search name or company..." className="pl-9" value={filters.name} onChange={(e) => handleFilterChange('name', e.target.value)} />
                        </div>                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><SlidersHorizontal className="w-4 h-4 mr-2"/> Filter</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {Object.keys(filterOptions).map((key) => (
                                    <DropdownMenuItem key={key} onSelect={() => setActiveFilterSelect(key as FilterType)}>
                                        Filter by {filterOptions[key as FilterType].label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>                        
                        {activeFilterSelect && (
                            <Select onValueChange={(value) => handleFilterChange(activeFilterSelect, value)}>
                                <SelectTrigger className="w-full md:w-[180px] animate-in fade-in-0 zoom-in-95">
                                    <SelectValue placeholder={`Select ${filterOptions[activeFilterSelect].label}...`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {filterOptions[activeFilterSelect].values.map(val => <SelectItem key={val} value={val}>{val}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </div>                
                {activeFiltersList.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                        <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
                        {activeFiltersList.map(([key, value]) => (
                            <Tag key={key} className="flex items-center gap-2">
                                {filterOptions[key as FilterType].label}: {value}
                                <button onClick={() => handleFilterChange(key as FilterType, '')} className="ml-1 rounded-full hover:bg-destructive/20 p-0.5">
                                    <X className="w-3 h-3"/>
                                </button>
                            </Tag>
                        ))}
                    </div>
                )}
            </div>            
            {isLoading ? (
                <div className="text-center p-20 font-semibold text-muted-foreground">Loading investors...</div>
            ) : investors.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {investors.map(investor => <InvestorCard key={investor.id} investor={investor} />)}
                    </div>
                    <div className="flex justify-center items-center gap-4 pt-8">
                        <Button variant="outline" disabled>Previous</Button>
                        <span className="text-sm font-medium">Page 1 of 1</span>
                        <Button variant="outline" disabled>Next</Button>
                    </div>
                </>
            ) : (
                <div className="text-center p-16 border-2 border-dashed border-border rounded-lg">
                    <h3 className="font-semibold text-foreground">No investors found</h3>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}