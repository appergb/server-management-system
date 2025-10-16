from src.models.user import db
from datetime import datetime

class Server(db.Model):
    __tablename__ = 'servers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    host = db.Column(db.String(100), nullable=False)
    port = db.Column(db.Integer, default=22)
    server_type = db.Column(db.String(50), nullable=False)  # linux, windows, docker, k8s
    auth_type = db.Column(db.String(20), default='password')  # password, key
    username = db.Column(db.String(100))
    password = db.Column(db.String(255))
    private_key = db.Column(db.Text)
    status = db.Column(db.String(20), default='offline')  # online, offline, error
    user_id = db.Column(db.Integer)  # Foreign key removed for simplicity
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    metrics = db.relationship('Metric', backref='server', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'host': self.host,
            'port': self.port,
            'type': self.server_type,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Metric(db.Model):
    __tablename__ = 'metrics'
    
    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    cpu_usage = db.Column(db.Float, default=0.0)
    memory_usage = db.Column(db.Float, default=0.0)
    disk_usage = db.Column(db.Float, default=0.0)
    network_in = db.Column(db.Float, default=0.0)
    network_out = db.Column(db.Float, default=0.0)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'cpu': self.cpu_usage,
            'memory': self.memory_usage,
            'disk': self.disk_usage,
            'network_in': self.network_in,
            'network_out': self.network_out,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }


class Task(db.Model):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    task_type = db.Column(db.String(50), nullable=False)  # command, script, deploy
    schedule = db.Column(db.String(100))  # Cron expression
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))
    user_id = db.Column(db.Integer)  # Foreign key removed for simplicity
    status = db.Column(db.String(20), default='pending')  # pending, running, completed, failed
    result = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.task_type,
            'schedule': self.schedule,
            'status': self.status,
            'result': self.result,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Alert(db.Model):
    __tablename__ = 'alerts'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    metric = db.Column(db.String(50), nullable=False)  # cpu, memory, disk, network
    threshold = db.Column(db.Float, nullable=False)
    condition = db.Column(db.String(10), nullable=False)  # gt, lt, eq
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))
    enabled = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'metric': self.metric,
            'threshold': self.threshold,
            'condition': self.condition,
            'enabled': self.enabled,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

