import { useState } from "react";
import { 
  Coffee, 
  Car, 
  Home, 
  ShoppingBag, 
  Gamepad2,
  Utensils,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Sample transaction data grouped by categories
const transactionData = {
  "Food & Dining": {
    total: -487.32,
    count: 12,
    color: "warning",
    icon: Utensils,
    transactions: [
      { id: 1, merchant: "Starbucks", amount: -12.50, date: "Dec 26", description: "Coffee", icon: Coffee },
      { id: 2, merchant: "McDonald's", amount: -8.99, date: "Dec 25", description: "Fast food", icon: Utensils },
      { id: 3, merchant: "Whole Foods", amount: -127.45, date: "Dec 24", description: "Groceries", icon: ShoppingBag },
      { id: 4, merchant: "Chipotle", amount: -15.20, date: "Dec 23", description: "Lunch", icon: Utensils },
      { id: 5, merchant: "Local Restaurant", amount: -78.90, date: "Dec 22", description: "Dinner", icon: Utensils },
    ]
  },
  "Transportation": {
    total: -234.67,
    count: 8,
    color: "primary",
    icon: Car,
    transactions: [
      { id: 6, merchant: "Shell Gas Station", amount: -45.20, date: "Dec 26", description: "Fuel", icon: Car },
      { id: 7, merchant: "Uber", amount: -18.50, date: "Dec 25", description: "Rideshare", icon: Car },
      { id: 8, merchant: "Metro Transit", amount: -25.00, date: "Dec 24", description: "Monthly pass", icon: Car },
      { id: 9, merchant: "Parking Meter", amount: -5.00, date: "Dec 23", description: "Downtown parking", icon: Car },
    ]
  },
  "Shopping": {
    total: -189.99,
    count: 5,
    color: "accent",
    icon: ShoppingBag,
    transactions: [
      { id: 10, merchant: "Amazon", amount: -89.99, date: "Dec 25", description: "Electronics", icon: ShoppingBag },
      { id: 11, merchant: "Target", amount: -45.50, date: "Dec 23", description: "Household items", icon: ShoppingBag },
      { id: 12, merchant: "Apple Store", amount: -29.99, date: "Dec 22", description: "App purchase", icon: ShoppingBag },
    ]
  },
  "Entertainment": {
    total: -67.48,
    count: 4,
    color: "success",
    icon: Gamepad2,
    transactions: [
      { id: 13, merchant: "Netflix", amount: -15.99, date: "Dec 25", description: "Subscription", icon: Gamepad2 },
      { id: 14, merchant: "Spotify", amount: -9.99, date: "Dec 24", description: "Premium", icon: Gamepad2 },
      { id: 15, merchant: "Movie Theater", amount: -24.50, date: "Dec 23", description: "Tickets", icon: Gamepad2 },
    ]
  },
  "Income": {
    total: 4500.00,
    count: 2,
    color: "success",
    icon: ArrowUpRight,
    transactions: [
      { id: 16, merchant: "Acme Corp", amount: 4500.00, date: "Dec 25", description: "Salary deposit", icon: ArrowUpRight },
      { id: 17, merchant: "Freelance Client", amount: 800.00, date: "Dec 22", description: "Project payment", icon: ArrowUpRight },
    ]
  }
};

function getCategoryColor(color: string) {
  switch (color) {
    case "success":
      return "text-success bg-success/10 border-success/20";
    case "warning":
      return "text-warning bg-warning/10 border-warning/20";
    case "primary":
      return "text-primary bg-primary/10 border-primary/20";
    case "accent":
      return "text-accent bg-accent/10 border-accent/20";
    default:
      return "text-foreground bg-background-subtle border-border";
  }
}

function CategorySummary({ category, data }: { category: string; data: any }) {
  const Icon = data.icon;
  const isPositive = data.total > 0;
  
  return (
    <Card variant="glass" className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg border ${getCategoryColor(data.color)}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-medium text-sm">{category}</h3>
            <p className="text-xs text-foreground-subtle">{data.count} transactions</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${isPositive ? 'text-success' : 'text-foreground'}`}>
            {isPositive ? '+' : ''}${Math.abs(data.total).toFixed(2)}
          </p>
          <div className="flex items-center gap-1 justify-end">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 text-success" />
            ) : (
              <TrendingDown className="w-3 h-3 text-error" />
            )}
            <span className="text-xs text-foreground-muted">
              vs last month
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TransactionRow({ transaction, categoryColor }: { transaction: any; categoryColor: string }) {
  const Icon = transaction.icon;
  const isPositive = transaction.amount > 0;
  
  return (
    <TableRow className="hover:bg-background-subtle/50">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg border ${getCategoryColor(categoryColor)}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium text-sm">{transaction.merchant}</p>
            <p className="text-xs text-foreground-subtle">{transaction.description}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <span className="text-sm text-foreground-subtle">{transaction.date}</span>
      </TableCell>
      <TableCell className="text-right">
        <span className={`font-semibold ${isPositive ? 'text-success' : 'text-foreground'}`}>
          {isPositive ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
        </span>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function TransactionsList() {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const totalSpent = Object.values(transactionData)
    .filter(cat => cat.total < 0)
    .reduce((sum, cat) => sum + Math.abs(cat.total), 0);
    
  const totalIncome = Object.values(transactionData)
    .filter(cat => cat.total > 0)
    .reduce((sum, cat) => sum + cat.total, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Total Income</p>
              <p className="text-2xl font-bold text-success">+${totalIncome.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-xl bg-success/10 border border-success/20">
              <ArrowUpRight className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Total Spent</p>
              <p className="text-2xl font-bold">-${totalSpent.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-xl bg-error/10 border border-error/20">
              <ArrowDownLeft className="w-6 h-6 text-error" />
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-subtle">Net Change</p>
              <p className="text-2xl font-bold text-success">
                +${(totalIncome - totalSpent).toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions Card */}
      <Card variant="glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
              <p className="text-sm text-foreground-subtle mt-1">
                Automatically synced from your connected accounts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="by-category" className="space-y-4">
            <TabsList>
              <TabsTrigger value="by-category">By Category</TabsTrigger>
              <TabsTrigger value="chronological">Chronological</TabsTrigger>
            </TabsList>

            <TabsContent value="by-category" className="space-y-6">
              {/* Category Summaries */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(transactionData).map(([category, data]) => (
                  <CategorySummary key={category} category={category} data={data} />
                ))}
              </div>

              {/* Transactions by Category */}
              <div className="space-y-6">
                {Object.entries(transactionData).map(([category, data]) => (
                  <div key={category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium flex items-center gap-2">
                        <data.icon className="w-4 h-4" />
                        {category}
                        <Badge variant="secondary" className="ml-2">
                          {data.transactions.length} transactions
                        </Badge>
                      </h3>
                      <p className={`font-semibold ${data.total > 0 ? 'text-success' : 'text-foreground'}`}>
                        {data.total > 0 ? '+' : ''}${Math.abs(data.total).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="rounded-xl border border-border-subtle overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Transaction</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="w-12"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.transactions.map((transaction) => (
                            <TransactionRow 
                              key={transaction.id} 
                              transaction={transaction} 
                              categoryColor={data.color}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="chronological" className="space-y-4">
              <div className="rounded-xl border border-border-subtle overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(transactionData)
                      .flatMap(([category, data]) => 
                        data.transactions.map(t => ({ ...t, category, categoryColor: data.color }))
                      )
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-background-subtle/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg border ${getCategoryColor(transaction.categoryColor)}`}>
                                <transaction.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{transaction.merchant}</p>
                                <p className="text-xs text-foreground-subtle">{transaction.description}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              {transaction.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-sm text-foreground-subtle">{transaction.date}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={`font-semibold ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}