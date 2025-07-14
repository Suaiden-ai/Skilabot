
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from "framer-motion";
import { Zap, ThermometerSun, Lightbulb, TrendingUp, Activity, Shield } from "lucide-react";

export default function DashboardOverview() {
  // Dados simulados baseados na imagem
  const spendingData = [
    { month: 'Jan', electricity: 320, water: 180, gas: 140 },
    { month: 'Feb', electricity: 280, water: 160, gas: 120 },
    { month: 'Mar', electricity: 340, water: 200, gas: 160 },
    { month: 'Apr', electricity: 300, water: 170, gas: 130 },
    { month: 'May', electricity: 380, water: 220, gas: 180 },
    { month: 'Jun', electricity: 420, water: 240, gas: 200 },
    { month: 'Jul', electricity: 460, water: 260, gas: 220 },
    { month: 'Aug', electricity: 440, water: 250, gas: 210 },
    { month: 'Sep', electricity: 400, water: 230, gas: 190 },
    { month: 'Oct', electricity: 360, water: 210, gas: 170 },
    { month: 'Nov', electricity: 320, water: 190, gas: 150 },
    { month: 'Dec', electricity: 380, water: 220, gas: 180 }
  ];

  const dayNightData = [
    { name: 'Day', value: 65, color: '#60A5FA' },
    { name: 'Night', value: 35, color: '#34D399' }
  ];

  const lightsIndoor = [
    { name: 'Kitchen', status: false },
    { name: 'Dining Room', status: false },
    { name: 'Living Room', status: true }
  ];

  const lightsOutdoor = [
    { name: 'Front Door', status: false },
    { name: 'Garage', status: false },
    { name: 'Garden', status: true }
  ];

  return (
    <motion.div 
      className="space-y-8 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {/* Page Header */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>🏠</span>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-blue-600 font-medium">IOT</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IOT Dashboard
          </h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <motion.div 
            className="text-right"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security System
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Triggered</span>
              <Badge variant="destructive" className="animate-pulse">Loose</Badge>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-right"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm text-gray-500">Main Gate</div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Opened</span>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-600" />
                  ENERGY USE
                </CardTitle>
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                250 kw/h 
                <motion.span 
                  className="text-green-500"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ↗
                </motion.span>
              </div>
              <div className="text-xs text-gray-500 mb-4">Analytics for last week</div>
              <div className="h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-60"></div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                  LIGHTS
                </CardTitle>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">6 Lights are ON</div>
              <div className="text-xs text-gray-500 mb-4">Analytics for last week</div>
              <div className="h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60"></div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <ThermometerSun className="w-4 h-4 text-green-600" />
                  DAILY AVG TEMPERATURE
                </CardTitle>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <ThermometerSun className="w-4 h-4 text-green-600" />
                  </motion.div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">20° C</div>
              <div className="text-xs text-gray-500 mb-4">Analytics for last week</div>
              <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-60"></div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts and Data Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {/* Spending Chart */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <BarChart className="w-5 h-5 text-blue-600" />
                Spending by Year
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="electricity" fill="#22D3EE" name="Electricity" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="water" fill="#3B82F6" name="Water" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="gas" fill="#06B6D4" name="Gas" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Day/Night Usage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Day/Night Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={dayNightData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {dayNightData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <span className="text-sm font-medium">Night</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium">Day</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Air Conditioner Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Air Conditioner</CardTitle>
                <Badge className="bg-green-100 text-green-700 animate-pulse">On</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Temperature</div>
                  <div className="text-3xl font-bold text-orange-500">28°C</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <div className="text-sm text-orange-500 font-medium">Cooling On..</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lights Indoor */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Lights Indoor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lightsIndoor.map((light, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm font-medium">{light.name}</span>
                    <motion.div 
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                        light.status 
                          ? 'bg-teal-400 border-teal-400 shadow-lg shadow-teal-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {light.status && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full bg-white rounded-full opacity-30"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lights Outdoor */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-500" />
                Lights Outdoor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lightsOutdoor.map((light, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm font-medium">{light.name}</span>
                    <motion.div 
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                        light.status 
                          ? 'bg-teal-400 border-teal-400 shadow-lg shadow-teal-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {light.status && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full bg-white rounded-full opacity-30"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
