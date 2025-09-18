import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Camera, 
  Smartphone, 
  Clock, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Play,
  Square,
  BarChart3,
  Download,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  user: {
    name: string;
    role: "Admin" | "Teacher" | "Student";
  };
}

export const Dashboard = ({ user }: DashboardProps) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    present: 0,
    total: 0,
    percentage: 0,
  });
  const [sessionData, setSessionData] = useState({
    course: "Computer Science 101",
    startTime: null as Date | null,
    location: "Room A-101",
    studentsPresent: 12,
    totalStudents: 45,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Mock data for different user roles
    if (user.role === "Student") {
      setAttendanceData({
        present: 18,
        total: 22,
        percentage: 82,
      });
    } else if (user.role === "Teacher") {
      setSessionData({
        ...sessionData,
        studentsPresent: Math.floor(Math.random() * 10) + 35,
      });
    }
  }, [user.role]);

  const startSession = () => {
    setIsSessionActive(true);
    setSessionData({
      ...sessionData,
      startTime: new Date(),
    });
    toast({
      title: "Session Started",
      description: "Students can now mark their attendance.",
    });
  };

  const endSession = () => {
    setIsSessionActive(false);
    setSessionData({
      ...sessionData,
      startTime: null,
    });
    toast({
      title: "Session Ended",
      description: "Attendance session has been closed.",
    });
  };

  const markAttendance = async () => {
    // Simulate security checks
    toast({
      title: "Running Security Checks",
      description: "Verifying GPS location, device, and facial recognition...",
    });

    setTimeout(() => {
      // Simulate successful attendance
      setAttendanceData({
        present: attendanceData.present + 1,
        total: attendanceData.total + 1,
        percentage: Math.round(((attendanceData.present + 1) / (attendanceData.total + 1)) * 100),
      });
      
      toast({
        title: "Attendance Marked",
        description: "Your attendance has been successfully recorded.",
      });
    }, 2000);
  };

  if (user.role === "Student") {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Track your attendance and manage your academic progress</p>
        </div>

        {/* Attendance Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.total}</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold status-secure">{attendanceData.present}</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold status-secure">{attendanceData.percentage}%</div>
              <Progress value={attendanceData.percentage} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Attendance Marking */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Mark Attendance
            </CardTitle>
            <CardDescription>
              Ensure you're in the classroom and all security checks pass
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Security Status */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                <MapPin className="h-4 w-4 status-secure" />
                <span className="text-sm font-medium">GPS Verified</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                <Smartphone className="h-4 w-4 status-secure" />
                <span className="text-sm font-medium">Device Bound</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <Camera className="h-4 w-4 status-warning" />
                <span className="text-sm font-medium">Face Recognition</span>
              </div>
            </div>

            {isSessionActive ? (
              <Button onClick={markAttendance} variant="secure" className="w-full" size="lg">
                <CheckCircle2 className="h-4 w-4" />
                Mark Attendance
              </Button>
            ) : (
              <div className="text-center p-6 border-2 border-dashed border-muted rounded-lg">
                <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No active attendance session</p>
                <p className="text-sm text-muted-foreground">Wait for your teacher to start the session</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "2024-09-18", status: "Present", course: "Computer Science 101" },
                { date: "2024-09-17", status: "Present", course: "Mathematics" },
                { date: "2024-09-16", status: "Absent", course: "Physics" },
                { date: "2024-09-15", status: "Present", course: "Computer Science 101" },
              ].map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{record.course}</p>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                  </div>
                  <Badge variant={record.status === "Present" ? "default" : "destructive"}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role === "Teacher") {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Manage attendance sessions and monitor student progress</p>
        </div>

        {/* Session Control */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Attendance Session
            </CardTitle>
            <CardDescription>
              Control attendance sessions for your classes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Course</label>
                <p className="text-lg">{sessionData.course}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <p className="text-lg">{sessionData.location}</p>
              </div>
            </div>

            {isSessionActive ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium status-secure">Session Active</p>
                    <p className="text-sm text-muted-foreground">
                      Started at {sessionData.startTime?.toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Live</Badge>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Students Present</span>
                      </div>
                      <p className="text-2xl font-bold">{sessionData.studentsPresent}/{sessionData.totalStudents}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Attendance Rate</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {Math.round((sessionData.studentsPresent / sessionData.totalStudents) * 100)}%
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Button onClick={endSession} variant="destructive" className="w-full" size="lg">
                  <Square className="h-4 w-4" />
                  End Session
                </Button>
              </div>
            ) : (
              <Button onClick={startSession} variant="secure" className="w-full" size="lg">
                <Play className="h-4 w-4" />
                Start Attendance Session
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Attendance Reports */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Class Reports</CardTitle>
            <CardDescription>View and export attendance reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Report</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold status-secure">85%</p>
                          <p className="text-sm text-muted-foreground">Average Attendance</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold">22</p>
                          <p className="text-sm text-muted-foreground">Total Sessions</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold">45</p>
                          <p className="text-sm text-muted-foreground">Enrolled Students</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4" />
                      View Report
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed" className="mt-6">
                <div className="space-y-4">
                  <div className="border rounded-lg">
                    <table className="w-full">
                      <thead className="border-b">
                        <tr className="text-left">
                          <th className="p-3 font-medium">Student</th>
                          <th className="p-3 font-medium">Reg. No.</th>
                          <th className="p-3 font-medium">Attendance</th>
                          <th className="p-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Alice Johnson", regNo: "CS001", attendance: 90, status: "Good" },
                          { name: "Bob Smith", regNo: "CS002", attendance: 85, status: "Good" },
                          { name: "Charlie Brown", regNo: "CS003", attendance: 75, status: "Warning" },
                          { name: "Diana Prince", regNo: "CS004", attendance: 95, status: "Excellent" },
                        ].map((student, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="p-3">{student.name}</td>
                            <td className="p-3 text-muted-foreground">{student.regNo}</td>
                            <td className="p-3">{student.attendance}%</td>
                            <td className="p-3">
                              <Badge 
                                variant={
                                  student.attendance >= 90 ? "default" : 
                                  student.attendance >= 80 ? "secondary" : "destructive"
                                }
                              >
                                {student.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor system-wide analytics and manage users</p>
      </div>

      {/* System Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Users</span>
            </div>
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 status-secure" />
              <span className="text-sm font-medium">Active Sessions</span>
            </div>
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Avg Attendance</span>
            </div>
            <p className="text-2xl font-bold">87%</p>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 status-warning" />
              <span className="text-sm font-medium">Security Alerts</span>
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
          <CardDescription>Recent events and security monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                type: "session_start", 
                message: "Dr. Smith started attendance session for CS101",
                time: "2 minutes ago",
                status: "info"
              },
              { 
                type: "security_alert", 
                message: "Multiple login attempts detected for user @johndoe",
                time: "15 minutes ago",
                status: "warning"
              },
              { 
                type: "attendance", 
                message: "85 students marked attendance in the last hour",
                time: "1 hour ago",
                status: "success"
              },
              { 
                type: "system", 
                message: "System backup completed successfully",
                time: "3 hours ago",
                status: "info"
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === "success" ? "bg-green-500" :
                  activity.status === "warning" ? "bg-amber-500" :
                  "bg-blue-500"
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{activity.message}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};